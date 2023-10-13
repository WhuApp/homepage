import { useStore } from '@nanostores/react';
import { auth0Token } from '../stores/tokenStore';
import { logoutFlow, type AuthToken } from '../auth0';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const BASE_URL = 'https://api.whu.app/users/v1/';

function DeleteUserBadge() {
  const [message, setMessage] = useState<string>('');
  const authToken: AuthToken = JSON.parse(useStore(auth0Token));

  if (useStore(auth0Token)) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const message = await deleteOwnUser(authToken);
                setMessage(message);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

  if (response.status === 204) {
    logoutFlow();
    return 'Successfully deleted';
  }

  return await response.text();
};

export default DeleteUserBadge;
