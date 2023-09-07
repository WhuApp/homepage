import { auth0Token } from './stores/tokenStore';

export const ROOT = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.PUBLIC_ROOT;

const url: string = 'https://whuapp.eu.auth0.com';
const clientId: string = 'LVuz7aq6FbmSk7Gc1MWiOVkHvHs7SDTW';
const callBackUrl: string = `${ROOT}/redirect/auth0/callback`;
const logOutUrl: string = `${ROOT}/redirect/auth0/logout`;
const audience: string = `${url}/api/v2/`;
const scope: string = `openid offline_access`;

export const loginFlow = () => {
  const id = makeid(8);

  localStorage.setItem('auth0State', id);

  window.location.replace(
    `${url}/authorize?` +
      `audience=${audience}&` +
      `response_type=code&` +
      `scope=${scope}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${callBackUrl}&` +
      `state=${id}`
  );
};

export const logoutFlow = () => {
  auth0Token.set('');
  window.location.replace(`${url}/v2/logout?` + `client_id=${clientId}&` + `returnTo=${logOutUrl}`);
};

export type AuthToken = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

export type AuthError = {
  error: string;
  error_description: string;
};

export function isAuthError(response: FetchTokenResponse): response is AuthError {
  const error = response as AuthError;
  return error.error !== undefined && error.error_description !== undefined;
}

export type FetchTokenResponse = AuthError | AuthToken;

export const fetchToken = async (code: string, secret: string): Promise<FetchTokenResponse> => {
  const auth0Response = await fetch(`${url}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: secret,
      code: code,
      redirect_uri: callBackUrl,
    }),
  });
  const response = await auth0Response.json();

  return await response;
};

const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
