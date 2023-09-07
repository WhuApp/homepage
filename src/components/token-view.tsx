import { useStore } from '@nanostores/react';
import { auth0Token } from '../stores/tokenStore';
import type { AuthToken } from '../auth0';

function TokenView() {
  if (useStore(auth0Token)) {
    const authToken: AuthToken = JSON.parse(useStore(auth0Token));
    return (
      <div>
        <div>
          <p>Access Token:</p>
          <p>{authToken.access_token}</p>
        </div>
        <div>
          <p>ID Token: </p>
          <p>{authToken.id_token}</p>
        </div>
        <div>
          <p>Refresh Token: </p>
          <p>{authToken.refresh_token}</p>
        </div>
        <div>
          <p>Expiration: </p>
          <p>{authToken.expires_in}</p>
        </div>
        <div>
          <p>Scope: </p>
          <p>{authToken.scope}</p>
        </div>
        <div>
          <p>Token type: </p>
          <p>{authToken.token_type}</p>
        </div>
      </div>
    );
  } else {
    return <p>Not logged in</p>;
  }
}

export default TokenView;
