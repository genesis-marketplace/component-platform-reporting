import { css, GenesisElementLayout, html } from '@genesislcap/web-core';

export const defaultLayout = new GenesisElementLayout(
  html`
    <div class="container">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  `,
  css`
    :host {
    }

    .container {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
    }

    .content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `,
);
