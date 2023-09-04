import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { auth0Token } from '../stores/tokenStore';
import { ROOT, type Auth0TokenResponse } from '../auth0';

@customElement('auth-code')
export class AuthCode extends LitElement {
  async firstUpdated(changedProperties: any) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log('urlParams:', urlParams);

    const code = urlParams.get('code');
    const urlState = urlParams.get('state');

    const localState = localStorage.getItem('auth0State');

    if (localState !== urlState) {
      console.log('States do not match');
      window.location.replace(ROOT);
    } else if (!code) {
      console.log('No code recieved');
      window.location.replace(ROOT);
    } else {
      console.log(`trying to fetch token...`);

      const verifier = localStorage.getItem('verifier');

      const response = await fetch(`${ROOT}/endpoint/auth0/token.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code,
        }),
      });

      console.log(JSON.stringify(response));
      const tokenResponse: Auth0TokenResponse = await response.json();

      console.log('token fetched successfully:', JSON.stringify(tokenResponse));

      const token = tokenResponse.access_token;

      if (!token) {
        console.log('no token found');
        auth0Token.set('');
      } else {
        console.log('token retrieved:', token);
        auth0Token.set(token);
      }
      //window.location.replace(ROOT);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-code': AuthCode;
  }
}
