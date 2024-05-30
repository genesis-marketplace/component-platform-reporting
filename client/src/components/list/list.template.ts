import { html, repeat, ref } from '@genesislcap/web-core';
import { REPORT_COLUMN_DEFS } from './columns';
import type { List } from './list';
import { gridTag } from '../../tags';

// TODO: provide gridoptions in class
export const ListTemplate = html<List>`
  <${gridTag}
    ${ref('grid')}
    data-test-id="report-grid"
    only-template-col-defs
    rowSelection="multiple"
    suppressRowClickSelection
    suppressRowTransform
  >
    <grid-pro-genesis-datasource resource-name="ALL_SAVED_REPORTS"></grid-pro-genesis-datasource>
    ${repeat(
      (x) => REPORT_COLUMN_DEFS(x),
      html`
        <grid-pro-column
          data-test-id="report-grid-column"
          :definition="${(x) => x}"
        ></grid-pro-column>
      `,
    )}
    <grid-pro-column
      data-test-id="report-grid-actions-column"
      :definition=${(x) => x.actionsMenuSlottedConfig}
    ></grid-pro-column>
  </${gridTag}>
`;
