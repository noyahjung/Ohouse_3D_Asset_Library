// AWS Lambda adapter (Function URL, payload format v2.0).
// Deploy on Node.js 20+ runtime. Set the OpenAI key as an encrypted
// environment variable OPENAI_API_KEY (or wire Secrets Manager in front).
// Same generateAsset() core as the local proxy.
//
// Function URL config: Auth type NONE (or IAM), CORS allow-origin set to
// the S3/CDN origin that serves asset-builder.html.

import { generateAsset } from './handler.mjs';

const ENV = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_MODEL,
};

const CORS = {
  'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (status, obj) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', ...CORS },
  body: JSON.stringify(obj),
});

export const handler = async (event) => {
  const method =
    event?.requestContext?.http?.method || event?.httpMethod || 'POST';
  if (method === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (method !== 'POST') return json(405, { error: 'POST only' });

  try {
    let raw = event.body || '{}';
    if (event.isBase64Encoded) raw = Buffer.from(raw, 'base64').toString('utf8');
    const input = JSON.parse(raw);
    const out = await generateAsset(input, ENV);
    return json(200, out);
  } catch (e) {
    return json(e.status || 500, { error: e.message });
  }
};
