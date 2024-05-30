import { css } from '@genesislcap/web-core';
import { helperStyles, normalizeStyles } from '../../styles';

export const SelectFiltersStyles = css`
  ${helperStyles}
  ${normalizeStyles}
  :host {
    --select-renderer-max-width: 150px;
  }

  .select-filters {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .all-fields,
  .selected-filters {
    height: 100%;
  }
`;
