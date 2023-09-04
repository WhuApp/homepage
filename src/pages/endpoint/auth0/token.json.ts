/*import type { APIRoute } from 'astro';
import { fetchToken } from '../../../auth0';

export const POST: APIRoute = async ({ request, locals }): Promise<Response> => {
  const body = await request.json();
  const code = body.code;
  let secret;
  if (import.meta.env.DEV) {
    secret = import.meta.env.AUTH0_SECRET;
  } else {
    secret = (locals as any).AUTH0_SECRET;
  }

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  const fetchResponse = await fetchToken(code, secret);
  return new Response(JSON.stringify(fetchResponse), { status: fetchResponse.error ? 400 : 200 });
};
*/
