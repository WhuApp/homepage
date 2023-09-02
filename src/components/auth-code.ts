import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { auth0Code } from '../stores/tokenStore';
import { ROOT } from '../auth0Flow';

@customElement('auth-code')
export class AuthCode extends LitElement {
  firstUpdated(changedProperties: any) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const code = urlParams.get('code');
    const urlState = urlParams.get('state');
    const localState = localStorage.getItem('auth0State');
    if (localState !== urlState || !code) {
      window.location.replace(ROOT);
    } else {
      auth0Code.set(code);
      window.location.replace(ROOT);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-code': AuthCode;
  }
}
