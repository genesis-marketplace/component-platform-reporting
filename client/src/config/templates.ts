import { TemplateElementDependency } from '@genesislcap/foundation-ui';
import { SyntheticViewTemplate } from '@genesislcap/web-core';

/**
 * TemplateComponents.
 * @public
 */
export type TemplateComponents = {
  icon: TemplateElementDependency;
  button: TemplateElementDependency;
  card: TemplateElementDependency;
  tabs: TemplateElementDependency;
  tab: TemplateElementDependency;
  tabPanel: TemplateElementDependency;
  textField: TemplateElementDependency;
  textArea: TemplateElementDependency;
  radioGroup: TemplateElementDependency;
  radio: TemplateElementDependency;
  toast: TemplateElementDependency;
  designSystemProvider: TemplateElementDependency;
  grid: TemplateElementDependency;
};

/**
 * TemplateOptions.
 * @public
 */
export type TemplateOptions = Partial<TemplateComponents> & {
  /**
   * @remarks
   * Just for reference that template options may be more than tags.
   * @internal
   */
  somePartial?: string | SyntheticViewTemplate;
};

/**
 * defaultTemplateOptions.
 * @remarks
 * The default template options this MF has been created with.
 * @public
 */
export const defaultTemplateOptions: TemplateOptions = {
  icon: 'rapid-icon',
  button: 'rapid-button',
  card: 'rapid-card',
  tabs:  'rapid-tabs',
  tab: 'rapid-tab',
  tabPanel: 'rapid-tab-panel',
  textField: 'rapid-text-field',
  textArea: 'rapid-text-area',
  radioGroup: 'rapid-radio-group',
  radio: 'rapid-radio',
  toast: 'rapid-toast',
  designSystemProvider: 'rapid-design-system-provider',
  grid: 'rapid-grid-pro',
};
