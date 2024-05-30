import { css } from '@genesislcap/web-core';
import { cardTag } from '../../tags';
import { helperStyles, normalizeStyles } from '../../styles';

export const SelectFieldsStyles = css`
  ${helperStyles}
  ${normalizeStyles}
  .available-fields,
  .selected-fields {
    height: 100%;
  }

  .select-fields {
    display: flex;
    width: 100%;
    height: 100%;
  }

  ${cardTag} {
    background-color: var(--neutral-layer-3);
  }
`;
