import { html, repeat, when } from '@genesislcap/web-core';
import type { ExecutionContext } from '@genesislcap/web-core';
import { tickIcon } from '../../assets/images';
import { Debug } from './debug';
import type { Wizard } from './wizard';
import { WizardStep } from './wizard.types';
import { buttonTag, cardTag, iconTag } from '../../tags';

const buttonLabel = (activeTab, content, isEdit) => {
  if (activeTab === content.length - 1) {
    return isEdit ? 'Update' : 'Save';
  } else {
    return 'Next';
  }
};

const TitleTemplate = html<Wizard>`
  <h5 class="step-title" data-test-id="step-title">
    <span
      class="step-number${(x, c: ExecutionContext) =>
        c.parent.activeTab > c.index || c.parent.activeTab === WizardStep.Three
          ? ' completed'
          : ''}"
      data-test-id="step-number"
    >
      ${(x, c: ExecutionContext) =>
        c.parent.activeTab > c.index
          ? html`
              ${tickIcon()}
            `
          : c.index + 1}
    </span>
    &nbsp;&nbsp;&nbsp;${(x) => x.title}
  </h5>
`;

const TabOneContextTemplate = html<Wizard>`
  <div
    class="nav-line${(x, c: ExecutionContext) =>
      c.parent.activeTab > c.index ? ' completed' : ''}"
    data-test-id="nav-line"
  >
    <div class="flex flex-column context-container">
      ${when(
        (x, c: ExecutionContext) => c.parent.activeTab >= 1 && c.index === 0,
        html`
          <p class="context" data-test-id="report-name">
            Report Name:
            <br />
            <b>${(x, c) => c.parent.reportName}</b>
          </p>
          <p class="context" data-test-id="data-source">
            Data Source:
            <br />
            <b>${(x, c) => c.parent.selectedDatasource}</b>
          </p>
        `,
      )}
      ${when(
        (x, c: ExecutionContext) => c.parent.activeTab >= 2 && c.index === 1,
        html`
          <p class="context" data-test-id="selected-fields">
            Selected fields:
            <br />
            <b>${(x, c) => c.parent.getNormalizedSelectedFields().join(`, `)}</b>
          </p>
        `,
      )}
      ${when(
        (x, c: ExecutionContext) => c.parent.activeTab >= WizardStep.Three && c.index === 2,
        html`
          <p class="context" data-test-id="applied-filters">
            Applied filters:
            <br />
            <b>${(x, c) => c.parent.getNormalizedSelectedFilters().join(`, `)}</b>
          </p>
        `,
      )}
    </div>
  </div>
`;

const WizardNavigation = html<Wizard>`
  <div class="nav-actions text-right" data-test-id="wizard-navigation">
    ${when(
      (x) => x.activeTab > 0,
      html`
        <${buttonTag} @click=${(x) => x.setActiveTab(x.activeTab - 1)} data-test-id="back-button">
          <${iconTag} class="mr-5px" name="arrow-left"></${iconTag}>
          Back
        </${buttonTag}>
      `,
    )}
    <${buttonTag}
      appearance="${(x) => x.config.buttonAppearance}"
      ?disabled=${(x) => x.isFormValid}
      @click=${(x) =>
        x.activeTab === x.content.length - 1
          ? x.saveReport(x.isEdit, x.getData())
          : x.setActiveTab(x.activeTab + 1)}
      data-test-id="next-button"
    >
      ${(x) => buttonLabel(x.activeTab, x.content, x.isEdit)}
      <${iconTag} class="ml-5px" name="arrow-right"></${iconTag}>
    </${buttonTag}>
  </div>
`;

const WizardContent = html<Wizard>`
  <${cardTag} class="card body" design-unit="5" data-test-id="wizard-content">
    ${(x) => x.viewTemplate}
  </${cardTag}>
`;

export const WizardTemplate = html<Wizard>`
  <div class="wizard grid-container">
    <${cardTag} class="card nav flex flex-column" data-test-id="wizard-navigation-card">
      <h3 class="section-title light-grey">${(x) => (x.isEdit ? 'Edit' : 'Create')} Report</h3>
      ${repeat(
        (x) => x.content,
        html`
          <div
            class="nav-item${(x, c: ExecutionContext) =>
              c.index === c.parent.activeTab ? ' active' : ''}"
            data-test-id="wizard-navigation-item"
          >
            ${TitleTemplate}
            ${when(
              (x, c: ExecutionContext) => x.description && c.index === c.parent.activeTab,
              html`
                <p class="description" data-test-id="wizard-navigation-item-description">
                  ${(x) => x.description}
                </p>
              `,
            )}
            ${TabOneContextTemplate}
          </div>
        `,
        { positioning: true, recycle: false },
      )}
      ${WizardNavigation} ${(x) => (x.debug ? Debug : null)}
    </${cardTag}>
    ${WizardContent}
  </div>
`;
