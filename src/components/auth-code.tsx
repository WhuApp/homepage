import { auth0Token } from '../stores/tokenStore';
import { ROOT, type Auth0TokenResponse } from '../auth0';
import { useEffect } from 'react';

function AuthCode() {
  useEffect(() => {
    (async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');
      const urlState = urlParams.get('state');
      const localState = localStorage.getItem('auth0State');

      if (localState !== urlState) {
        window.location.replace(ROOT);
      } else if (!code) {
        window.location.replace(ROOT);
      } else {
        const response = await fetch(`${ROOT}/endpoint/auth0/token.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: code,
          }),
        });

        const tokenResponse: Auth0TokenResponse = await response.json();
        const token = tokenResponse.access_token;

        if (!token) {
          auth0Token.set('');
        } else {
          auth0Token.set(token);
        }

        window.location.replace(ROOT);
      }
    })();
  }, []);

  return <p>Fetching Token</p>;
}
export default AuthCode;
