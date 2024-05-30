import { html } from '@genesislcap/web-core';

export const SelectStep = html`
  <div class="step h-90pc" data-test-id="select-fields-step">
    <reporting-select-fields
      :selectedFields=${(x) => x.selectedFields}
      :fieldData=${(x) => x.fieldData}
      selectedDatasource=${(x) => x.selectedDatasource}
      data-test-id="select-fields-component"
    ></reporting-select-fields>
  </div>
`;
