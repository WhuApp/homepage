import type { APIRoute } from 'astro';
import { fetchToken } from '../../../auth0';

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  const body = await request.json();
  const code = body.code;
  const secret = import.meta.env.AUTH0_SECRET;

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  const fetchResponse = await fetchToken(code, secret);
  return new Response(JSON.stringify(fetchResponse), { status: fetchResponse.error ? 400 : 200 });
};
