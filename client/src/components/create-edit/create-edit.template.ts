import { html } from '@genesislcap/web-core';
import type { CreateEdit } from './create-edit';

export const CreateEditTemplate = html<CreateEdit>`
  <div class="create-edit page" data-test-id="create-edit-page">
    <div class="container create-edit page">
      <reporting-wizard
        :report=${(x) => x.report}
        :saveReport=${(x) => x.saveReport}
        :datasourceSettings=${(x) => x.datasourceSettings}
        data-test-id="reporting-wizard"
      />
    </div>
  </div>
`;
