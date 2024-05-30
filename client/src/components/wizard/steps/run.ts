import { html } from '@genesislcap/web-core';
import type { Wizard } from '../wizard';

export const RunStep = html<Wizard>`
  <div class="step h-90pc mt-15px" data-test-id="run-report-step">
    <h3 class="mt-1 section-title dark-grey" data-test-id="run-report-step-title">Run Report</h3>
    <reporting-preview
      :report=${(x) => x.getData()}
      :datasourceSettings=${(x) => x.datasourceSettings}
      data-test-id="report-preview-component"
    />
  </div>
`;
