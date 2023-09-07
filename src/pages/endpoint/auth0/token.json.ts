import type { APIRoute } from 'astro';
import { fetchToken, isAuthError } from '../../../auth0';

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  const code = await request.text();
  const secret = import.meta.env.AUTH0_SECRET;

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  const response = await fetchToken(code, secret);

  return new Response(JSON.stringify(response), {
    status: isAuthError(response) ? 400 : 200,
  });
};
