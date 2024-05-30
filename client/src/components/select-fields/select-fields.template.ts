import { html, ref } from '@genesislcap/web-core';
import type { SelectFields } from './select-fields';
import { buttonTag, cardTag, gridTag } from '../../tags';

const availableFieldsTemplate = html<SelectFields>`
  <section class="available-fields" slot="left-section">
    <h3 class="mt-1 section-title dark-grey">Select fields</h3>
    <${cardTag} class="card">
      <div class="flex space-between">
        <h5 class="card-title">All fields</h5>
      </div>

      <div class="w-full h-90pc">
        <${gridTag}
          ${ref('allFieldsGrid')}
          rowSelection="multiple"
          data-test-id="select-fields-available"
        ></${gridTag}>
      </div>
    </${cardTag}>
  </section>
`;

const selectedFieldsTemplate = html<SelectFields>`
  <section class="selected-fields" slot="right-section">
    <div class="spacer-3"></div>
    <${cardTag} class="card">
      <div class="flex space-between">
        <h5 class="card-title">Selected fields</h5>
        <${buttonTag}
          @click=${(x) => x.removeSelectedFields()}
          ?disabled=${(x) => !x.fieldsToRemove.length}
          appearance="${(x) => x.config.buttonAppearance}"
        >
          Remove fields
        </${buttonTag}>
      </div>
      <div class="w-full h-90pc">
        <${gridTag}
          ${ref('selectedFieldsGrid')}
          rowSelection="multiple"
          data-test-id="select-fields-selected"
        ></${gridTag}>
      </div>
    </${cardTag}>
  </section>
`;

// TODO: review classes from merge conflict
export const SelectFieldsTemplate = html<SelectFields>`
  <layout-two-pane-horizontal splitRatio="right-main">
    ${availableFieldsTemplate} ${selectedFieldsTemplate}
  </layout-two-pane-horizontal>
`;
