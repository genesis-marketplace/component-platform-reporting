import { css } from '@genesislcap/web-core';
import { helperStyles } from '../styles';
import { designSystemProviderTag, tabPanelTag } from '../tags';


export const MainStyles = css`
  ${helperStyles}
  :host {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  ${designSystemProviderTag} {
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .notification-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 10;
    right: calc(var(--design-unit) * 10px);
    bottom: calc(var(--design-unit) * 10px);
    color: var(--neutral-foreground-rest);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--design-unit) * 4px) 0;
  }

  .title {
    font-size: var(--type-ramp-plus-4-font-size);
    font-weight: 700;
  }

  .tabs {
    width: 100%;
    height: 100%;
    background-color: var(--neutral-layer-4);
  }

  ::part(tablist),
  .tabs .tablist {
    height: 37;
  }

  ${tabPanelTag} {
    background-color: var(--neutral-layer-4);
    height: calc(100% - 110px);
    padding: 0 calc(var(--design-unit) * 4px);
  }

  .controls {
    align-items: center;
    display: flex;
    gap: calc(var(--design-unit) * 2px);
  }
`;
