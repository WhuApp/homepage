import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loginFlow } from '../auth0Flow';
import { auth0Code } from '../stores/tokenStore';
import { StoreController } from '@nanostores/lit';

@customElement('login-badge')
export class LoginBadge extends LitElement {
  private authCodeController = new StoreController(this, auth0Code);

  render() {
    if (this.authCodeController.value) {
      return html` <p>Logged in</p> `;
    } else {
      return html`<a href=${loginFlow()}> Log in </a>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-badge': LoginBadge;
  }
}
