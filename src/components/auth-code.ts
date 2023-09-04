import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { auth0Token } from '../stores/tokenStore';
import { fetchToken } from '../auth0';
import { ROOT } from '../auth0';

@customElement('auth-code')
export class AuthCode extends LitElement {
  async firstUpdated(changedProperties: any) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    console.log(urlParams);
    const code = urlParams.get('code');
    const urlState = urlParams.get('state');
    const localState = localStorage.getItem('auth0State');
    if (localState !== urlState || !code) {
      console.log('failed');
      window.location.replace(ROOT);
    } else {
      console.log(`trying to fetch token...`);
      const token = await fetchToken(code);
      console.log('token: ' + token);

      if (!token) {
        auth0Token.set('');
      } else {
        auth0Token.set(token.access_token);
      }
      window.location.replace(ROOT);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-code': AuthCode;
  }
}
