import { auth0Token } from '../stores/tokenStore';
import { ROOT, type AuthToken, type FetchTokenResponse } from '../auth0';
import { useEffect } from 'react';

function AuthCode() {
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const urlState = urlParams.get('state');
      const localState = localStorage.getItem('auth0State');

      if (localState == urlState && code) {
        const response = await fetch(`${ROOT}/endpoint/auth0/token.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: code,
        });

        if (response.status === 200) {
          const authToken: AuthToken = await response.json();
          auth0Token.set(JSON.stringify(authToken));
        } else {
          auth0Token.set('');
        }
      }
      window.location.replace(ROOT);
    })();
  }, []);

  return <p>Fetching Token</p>;
}
export default AuthCode;
