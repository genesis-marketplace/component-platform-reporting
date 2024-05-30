import { sync } from '@genesislcap/foundation-utils';
import { html, repeat } from '@genesislcap/web-core';
import type { Wizard } from '../wizard';
import { cardTag, radioGroupTag, radioTag, textAreaTag, textFieldTag } from '../../../tags';

const reportDescriptionTemplate = html<Wizard>`
  <section class="report-details" slot="left-section" data-test-id="report-details-section">
    <h3 class="mt-1 section-title dark-grey" data-test-id="report-name-title">Name Report</h3>
    <${cardTag} class="card">
      <h5 class="card-title">Report Set up</h5>
      <${textFieldTag}
        :value=${sync((x) => x.reportName)}
        class="w-full"
        placeholder="Enter report name..."
        data-test-id="report-name-input"
      >
        Report Name
      </${textFieldTag}>
      <${textAreaTag}
        :value=${sync((x) => x.reportDescription)}
        class="w-full mt-2"
        placeholder="Enter report description..."
        data-test-id="report-description-input"
      >
        Report Description
      </${textAreaTag}>
    </${cardTag}>
  </section>
`;

const dataSourceTemplate = html<Wizard>`
  <section class="data-sources" slot="right-section" data-test-id="data-sources-section">
    <h3 class="mt-1 section-title dark-grey" data-test-id="select-datasource-title">
      Select Datasource
    </h3>
    <${cardTag} class="card">
      <h5 class="card-title">Data Sources</h5>
      <div class="card-description">You have selected ${(x) => x.selectedDatasource}</div>
      <div class="divider"></div>
      <div class="radio-buttons" data-test-id="datasource-options">
        <${radioGroupTag} :value=${(x) => x.selectedDatasource}>
          ${repeat(
            (x) => x.datasourceOptions,
            html`
              <${radioTag}
                @click=${(x, c) => c.parent.onDatasourceChange(x.name)}
                :checked=${(x, c) => c.parent.selectedDatasource === x.name}
                :value=${(x) => x.name}
                class="radio-button${(x, c) =>
                  c.parent.selectedDatasource === x.name ? ' active' : ''}"
                data-test-id=${(x) => `datasource-option-${x.name}`}
              >
                ${(x) => x.name}
              </${radioTag}>
            `,
          )}
        </${radioGroupTag}>
      </div>
    </${cardTag}>
  </section>
`;

export const NameStep = html<Wizard>`
  <layout-two-pane-horizontal hideDivider splitRatio="right-main">
    ${reportDescriptionTemplate} ${dataSourceTemplate}
  </layout-two-pane-horizontal>
`;
