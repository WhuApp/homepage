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
      return html`<a href=${logoutFlow()}> Log out </a>`;
    } else {
      const a = loginFlow();
      console.log(a);
      return html`<a href=${a}> Log in </a>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-badge': LoginBadge;
  }
}
