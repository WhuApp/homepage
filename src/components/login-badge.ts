import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loginFlow, logoutFlow } from '../auth0';
import { auth0Token } from '../stores/tokenStore';
import { StoreController } from '@nanostores/lit';

@customElement('login-badge')
export class LoginBadge extends LitElement {
  private authCodeController = new StoreController(this, auth0Token);

  render() {
    if (this.authCodeController.value) {
      return html`<button @click="${logoutFlow}">Log out</button>`;
    } else {
      return html`<button @click="${loginFlow}">Log in</button>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-badge': LoginBadge;
  }
}
