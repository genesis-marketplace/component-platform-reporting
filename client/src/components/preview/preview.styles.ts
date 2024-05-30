import { css } from '@genesislcap/web-core';
import { helperStyles } from '../../styles';

export const PreviewStyles = css`
  ${helperStyles}
  .preview {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .controls {
    align-items: center;
    display: flex;
  }
`;
