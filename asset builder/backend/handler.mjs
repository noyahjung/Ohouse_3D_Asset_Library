// Core asset-generation handler — framework-agnostic.
// Runs identically behind the local proxy (server.mjs) and AWS Lambda
// (lambda.mjs). The OpenAI API key NEVER reaches this from the client;
// it is read from the environment by the caller and passed in here.

// Style references are fetched server-side (not by the browser) so the
// key-free frontend has no CORS/network dependency on GitHub, and so the
// reference set is locked to brand-approved images the client can't swap.
export const REFERENCE_URLS = [
  'https://raw.githubusercontent.com/noyahjung/brand-assets/main/stylereferencev2.png',
  'https://raw.githubusercontent.com/noyahjung/brand-assets/main/geometric-reference.png',
];

const OPENAI_EDITS_URL = 'https://api.openai.com/v1/images/edits';

// Small in-process cache so we don't re-download the (static) reference
// images on every request. Lambda keeps this warm across invocations on
// the same container; the local proxy keeps it for the process lifetime.
let refCache = null;
async function loadReferences() {
  if (refCache) return refCache;
  const blobs = await Promise.all(
    REFERENCE_URLS.map(async (url, i) => {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`레퍼런스 이미지를 불러오지 못했습니다 (${r.status}): ${url}`);
      const buf = await r.arrayBuffer();
      return new File([buf], `ref${i}.png`, { type: 'image/png' });
    })
  );
  refCache = blobs;
  return blobs;
}

/**
 * Generate one brand-styled 3D icon.
 * @param {{prompt:string, size?:string}} input  - validated client input
 * @param {{apiKey:string, model?:string}} env   - server-side secrets/config
 * @returns {Promise<{b64_json:string}>}
 */
export async function generateAsset(input, env) {
  const prompt = (input?.prompt || '').trim();
  if (!prompt) throw new httpError(400, 'prompt가 비어 있습니다.');
  if (prompt.length > 8000) throw new httpError(400, 'prompt가 너무 깁니다.');
  if (!env?.apiKey) throw new httpError(500, '서버에 OPENAI_API_KEY가 설정되지 않았습니다.');

  const refs = await loadReferences();

  const fd = new FormData();
  fd.append('model', env.model || 'gpt-image-1.5');
  refs.forEach((f) => fd.append('image[]', f));
  fd.append('prompt', prompt);
  fd.append('size', input.size || '1024x1024');
  fd.append('input_fidelity', 'high');
  fd.append('background', 'transparent');
  fd.append('n', '1');

  const res = await fetch(OPENAI_EDITS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.apiKey}` },
    body: fd,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || `OpenAI 요청 실패 (${res.status})`;
    throw new httpError(res.status === 401 ? 502 : res.status, msg);
  }

  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new httpError(502, 'OpenAI 응답에 이미지가 없습니다.');
  return { b64_json: b64 };
}

// Lightweight error carrying an HTTP status for the adapters to map.
export function httpError(status, message) {
  const e = new Error(message);
  e.status = status;
  return e;
}
