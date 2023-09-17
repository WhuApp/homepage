import { Button } from '@/components/ui/button';
import { loginFlow, logoutFlow } from '../auth0';
import { useStore } from '@nanostores/react';
import { auth0Token } from '../stores/tokenStore';

function LoginBadge() {
  if (useStore(auth0Token)) {
    return <Button onClick={logoutFlow}>Log out</Button>;
  } else {
    return <Button onClick={loginFlow}>Log in</Button>;
  }
}

export default LoginBadge;
