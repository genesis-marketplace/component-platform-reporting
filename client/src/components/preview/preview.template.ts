import { html, ref } from '@genesislcap/web-core';
import type { Preview } from './preview';
import { buttonTag, cardTag, gridTag, iconTag } from '../../tags';

export const PreviewReportTemplate = html<Preview>`
  <div class="preview" data-test-id="preview">
    <${cardTag} class="card">
      <div class="header">
        <div>
          <h3 class="card-title">${(x) => x.report['REPORT_NAME']}</h3>
          <p>${(x) => x.report['REPORT_DESCRIPTION']}</p>
        </div>
        <div class="controls">
          <${buttonTag}
            appearance="${(x) => x.config.buttonAppearance}"
            @click=${(x) => x.exportToCsv()}
            data-test-id="export-csv-button"
          >
            Export to csv
            <${iconTag} class="ml-5px" name="arrow-down"></${iconTag}>
          </${buttonTag}>
        </div>
      </div>
      <div class="w-full h-90pc">
        <${gridTag}
          ${ref('grid')}
          floatingFilter="false"
          rowSelection="multiple"
        ></${gridTag}>
      </div>
    </${cardTag}>
  </div>
`;
