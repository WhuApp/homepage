import { persistentAtom } from '@nanostores/persistent';
export const auth0Code = persistentAtom<string>('');
