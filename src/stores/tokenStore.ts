import { persistentAtom } from '@nanostores/persistent';
export const auth0Token = persistentAtom<string>('ath0Token', '', {
  encode: JSON.stringify,
  decode: JSON.parse,
});
