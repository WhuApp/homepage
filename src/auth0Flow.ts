export const ROOT = import.meta.env.DEV ? 'http://localhost:4321' : 'https://whu.app';

const AUTH0_PROBS = {
  authUrl: 'https://whuapp.eu.auth0.com/authorize',
  clientId: 'R0Gmz4MnvOrYMUBx3RGcMq4knq5J8Urt',
  tokenType: 'code',
  callBackUrl: `${ROOT}/redirect/auth0/callback`,
};

export const loginFlow = (): string => {
  const id = makeid(8);
  localStorage.setItem('auth0State', id);

  return (
    `${AUTH0_PROBS.authUrl}?` +
    `client_id=${AUTH0_PROBS.clientId}&` +
    `redirect_uri=${AUTH0_PROBS.callBackUrl}&` +
    `response_type=${AUTH0_PROBS.tokenType}&` +
    `state=${id}`
  );
};

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
