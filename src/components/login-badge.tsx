import { loginFlow, logoutFlow } from '../auth0';
import { useStore } from '@nanostores/react';
import { auth0Token } from '../stores/tokenStore';

function LoginBadge() {
  if (useStore(auth0Token)) {
    return <button onClick={logoutFlow}>Log out</button>;
  } else {
    return <button onClick={loginFlow}>Log in</button>;
  }
}

export default LoginBadge;
