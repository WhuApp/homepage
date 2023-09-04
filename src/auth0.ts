import { verifyToken } from './auth';
import { auth0Token } from './stores/tokenStore';

export const ROOT = import.meta.env.DEV ? 'http://localhost:4321' : 'https://whu.app';

const url: string = 'https://whuapp.eu.auth0.com';
const clientId: string = 'R0Gmz4MnvOrYMUBx3RGcMq4knq5J8Urt';
const callBackUrl: string = `${ROOT}/redirect/auth0/callback`;
const logOutUrl: string = `${ROOT}/redirect/auth0/logout`;
const audience: string = `${url}/api/v2/`;
const challangeMethod: string = 'S256';
const verifier: string = await base64URLEncode(crypto.getRandomValues(new Uint8Array(32)));
const challenge: string = await base64URLEncode(await sha256(verifier));
const loginScopes: string = '';

export const loginFlow = (): string => {
  const id = makeid(8);
  localStorage.setItem('verifier', verifier);
  localStorage.setItem('auth0State', id);

  return (
    `${url}/authorize?` +
    `audience=${audience}&` +
    `scope=${loginScopes}&` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${callBackUrl}&` +
    `code_challenge=${challenge}&` +
    `code_challenge_method=${challangeMethod}&` +
    `state=${id}&`
  );
};

export const logoutFlow = (): string => {
  auth0Token.set('');
  return `${url}/v2/logout?` + `client_id=${clientId}&` + `returnTo=${logOutUrl}`;
};

type Auth0TokenResponse = {
  token_type: string;
  access_token: string;
};

export const fetchToken = async (code: string): Promise<Auth0TokenResponse | undefined> => {
  const localVerifier = localStorage.getItem('verifier');
  if (!localVerifier) return undefined;
  const response = await fetch(`${url}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code: code,
      code_verifier: localVerifier,
      redirect_uri: callBackUrl,
    }),
  });
  const authResponse: Auth0TokenResponse = await response.json();

  const token = authResponse.access_token;
  if (token && (await verifyToken(authResponse.access_token))) {
    return authResponse;
  }
  return undefined;
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

async function sha256(verifier: string): Promise<ArrayBuffer> {
  return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
}

async function base64URLEncode(buffer: ArrayBuffer): Promise<string> {
  const org = await bytesToBase64DataUrl(buffer);
  const cut = org.slice(37);
  return cut.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function bytesToBase64DataUrl(
  buffer: ArrayBuffer,
  type = 'application/octet-stream'
): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => resolve(reader.result as string),
      onerror: () => reject(reader.error),
    });
    reader.readAsDataURL(new File([buffer], '', { type }));
  });
}
