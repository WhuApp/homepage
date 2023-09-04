import { auth0Token } from './stores/tokenStore';

export const ROOT = import.meta.env.DEV ? 'http://localhost:4321' : 'https://whu.app';

const url: string = 'https://whuapp.eu.auth0.com';
const clientId: string = 'LVuz7aq6FbmSk7Gc1MWiOVkHvHs7SDTW';
const callBackUrl: string = `${ROOT}/redirect/auth0/callback`;
const logOutUrl: string = `${ROOT}/redirect/auth0/logout`;
const audience: string = `${url}/api/v2/`;
const loginScopes: string = '';

export const loginFlow = async (): Promise<string> => {
  const id = makeid(8);

  localStorage.setItem('auth0State', id);

  return (
    `${url}/authorize?` +
    `audience=${audience}&` +
    `scope=${loginScopes}&` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${callBackUrl}&` +
    `state=${id}&`
  );
};

export const logoutFlow = (): string => {
  auth0Token.set('');
  return `${url}/v2/logout?` + `client_id=${clientId}&` + `returnTo=${logOutUrl}`;
};

export type Auth0TokenResponse = {
  token_type: string;
  access_token: string;
};

type FetchTokenResponse = { error?: string; auth0TokenResponse?: Auth0TokenResponse };

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

  console.log(auth0Response);

  return await auth0Response.json();
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
