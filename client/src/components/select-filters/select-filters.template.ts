import { html, ref } from '@genesislcap/web-core';
import type { SelectFilters } from './select-filters';
import { buttonTag, cardTag, gridTag } from '../../tags';

const allFieldsTemplate = html<SelectFilters>`
  <section class="all-fields" slot="left-section" data-test-id="all-fields-section">
    <h3 class="mt-1 section-title dark-grey">Apply filters</h3>
    <${cardTag} class="card">
      <div class="flex space-between">
        <h5 class="card-title">All fields</h5>
      </div>

      <div class="w-full h-90pc">
        <${gridTag}
          ${ref('availableFieldsGrid')}
          rowSelection="multiple"
          suppressRowClickSelection
          data-test-id="available-fields-grid"
        ></${gridTag}>
      </div>
    </${cardTag}>
  </section>
`;

const selectedFiltersTemplate = html<SelectFilters>`
  <section class="selected-filters" slot="right-section" data-test-id="selected-filters-section">
    <div class="spacer-3"></div>
    <${cardTag} class="card">
      <div class="flex space-between">
        <h5 class="card-title">Fields to Apply Filters</h5>
        <${buttonTag}
          @click=${(x) => x.removeSelectedFilters()}
          ?disabled=${(x) => !x.filtersToRemove.length}
          appearance="${(x) => x.config.buttonAppearance}"
          data-test-id="remove-filters-button"
        >
          Remove filters
        </${buttonTag}>
      </div>
      <div class="w-full h-90pc">
        <${gridTag}
          ${ref('selectedFiltersGrid')}
          rowSelection="multiple"
          suppressRowClickSelection
          data-test-id="selected-filters-grid"
        ></${gridTag}>
      </div>
    </${cardTag}>
  </section>
`;

export const SelectFiltersTemplate = html<SelectFilters>`
  <layout-two-pane-horizontal splitRatio="right-main">
    ${allFieldsTemplate} ${selectedFiltersTemplate}
  </layout-two-pane-horizontal>
`;
