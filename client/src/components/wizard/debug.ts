import { html } from '@genesislcap/web-core';

export const Debug = html`
  <div class="flex flex-column gap-1 overflow-auto">
    <div>
      <h5>Report Name</h5>
      <div>${(x) => x.reportName}</div>
    </div>

    <div>
      <h5>Report Description</h5>
      <div>${(x) => x.reportDescription}</div>
    </div>

    <div>
      <h5>Selected Datasource</h5>
      <div>${(x) => x.selectedDatasource}</div>
    </div>

    <div>
      <h5>Selected Fields</h5>
      <div><pre>${(x) => JSON.stringify(x.selectedFields, undefined, 2)}</pre></div>
    </div>

    <div>
      <h5>Selected Filters</h5>
      <div><pre>${(x) => JSON.stringify(x.selectedFilters, undefined, 2)}</pre></div>
    </div>

    <div>
      <h5>Field Data</h5>
      <div><pre>${(x) => JSON.stringify(x.fieldData, undefined, 2)}</pre></div>
    </div>
  </div>
`;
