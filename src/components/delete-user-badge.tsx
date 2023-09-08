import { useStore } from '@nanostores/react';
import { auth0Token } from '../stores/tokenStore';
import { logoutFlow, type AuthToken } from '../auth0';
import { useState } from 'react';

const BASE_URL = 'https://api.whu.app/users/v1/';

function DeleteUserBadge() {
  const [message, setMessage] = useState<string>('');
  const authToken: AuthToken = JSON.parse(useStore(auth0Token));
  if (useStore(auth0Token)) {
    return (
      <button
        onClick={async () => {
          const message = await deleteOwnUser(authToken);
          setMessage(message);
        }}
      >
        Delete User
      </button>
    );
  } else {
    return (
      <>
        <p>Not logged in</p>
        <p>{message}</p>
      </>
    );
  }
}

const deleteOwnUser = async (authToken: AuthToken): Promise<string> => {
  const response = await fetch(BASE_URL + 'me', {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + authToken.id_token },
  });

  if (response.status === 200) {
    logoutFlow();
    return 'Successfully deleted';
  }

  return await response.text();
};

export default DeleteUserBadge;
