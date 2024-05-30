import { css } from '@genesislcap/web-core';

export const stylesCardHeading = css`
  .heading {
    background-color: var(--neutral-layer-1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    margin: -4px -16px 0 -16px;
    padding: 8px 16px;
    font-size: 20px;
    font-weight: 700;
  }
`;

export const mixinScreen = (display: string = 'block') => `
  contain: content;
  display: ${display};
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

export const mixinCardStyles = `
  padding: 4px 16px 16px 16px;
`;
