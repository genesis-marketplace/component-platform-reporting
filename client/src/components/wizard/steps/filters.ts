import { html } from '@genesislcap/web-core';

export const FiltersStep = html`
  <div class="step h-90pc">
    <reporting-select-filters
      :selectedFields=${(x) => x.selectedFields}
      :selectedFilters=${(x) => x.selectedFilters}
    ></reporting-select-filters>
  </div>
`;
