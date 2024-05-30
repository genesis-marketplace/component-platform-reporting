import { attr, css, customElement, GenesisElement, html, when } from '@genesislcap/web-core';
import {iconTag} from '../tags';

enum Divider {
  equal = 'hyphen',
  leftMain = '',
  rightMain = 'hyphen',
}

const name = 'layout-two-pane-horizontal';

const styles = css`
  .container {
    align-items: stretch;
    column-gap: 4rem;
    display: grid;
    height: 100%;
  }

  .container.equal {
    grid-template-columns: 1fr 1fr;
  }

  .container.left-main {
    grid-template-columns: 3fr 1fr;
  }

  .container.right-main {
    grid-template-columns: 1fr 3fr;
  }

  .left {
    position: relative;
  }

  .left .divider {
    display: flex;
    font-size: 3.2rem;
    justify-content: center;
    position: absolute;
    right: -4rem;
    top: 50%;
    width: 4rem;
    color: var(--neutral-foreground-hint);
  }
`;

const template = html`
  <div class="container ${(x) => x.splitRatio}" part="split-container">
    <section class="left" part="left-section">
      <slot name="left-section"></slot>

      ${when(
        (x) => !x.hideDivider,
        html`
          <div class="divider" part="divider">
            <slot name="divider">
              <${iconTag} name="chevron-right"></${iconTag}>
            </slot>
          </div>
        `,
      )}
    </section>

    <section class="right" part="right-section">
      <slot name="right-section"></slot>
    </section>
  </div>
`;

@customElement({
  name,
  styles,
  template,
})
export class LayoutTwoPaneHorizontal extends GenesisElement {
  @attr({ mode: 'boolean' }) hideDivider: boolean = false;
  @attr splitRatio: string = 'equal';
}
