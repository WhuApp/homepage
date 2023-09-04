import { persistentAtom } from '@nanostores/persistent';
export const auth0Token = persistentAtom<string>('');
