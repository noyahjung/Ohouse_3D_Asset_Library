// Local development proxy — holds the OpenAI key in an env var and
// exposes a single key-free endpoint the frontend calls.
//
//   OPENAI_API_KEY=sk-... node server.mjs
//   (optional) PORT=8787  OPENAI_MODEL=gpt-image-1.5
//
// The browser talks ONLY to http://localhost:8787 — the key never
// leaves this process. Same generateAsset() core as the Lambda build.

import { createServer } from 'node:http';
import { generateAsset } from './handler.mjs';

const PORT = Number(process.env.PORT) || 8787;
const ENV = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_MODEL, // optional override
};

if (!ENV.apiKey) {
  console.error('✗ OPENAI_API_KEY 환경변수가 없습니다.  예) OPENAI_API_KEY=sk-... node server.mjs');
  process.exit(1);
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function send(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', ...CORS });
  res.end(body);
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }
  if (req.method === 'GET' && req.url === '/health') {
    return send(res, 200, { ok: true });
  }
  if (req.method !== 'POST' || req.url !== '/generate') {
    return send(res, 404, { error: 'POST /generate 만 지원합니다.' });
  }

  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const input = JSON.parse(Buffer.concat(chunks).toString() || '{}');
    const out = await generateAsset(input, ENV);
    send(res, 200, out);
  } catch (e) {
    const status = e.status || 500;
    console.error(`[${status}]`, e.message);
    send(res, status, { error: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`✓ 에셋 빌더 프록시 실행 중 → http://localhost:${PORT}`);
  console.log('  프론트(asset-builder.html)의 BACKEND_URL이 이 주소를 가리키게 두세요.');
});
