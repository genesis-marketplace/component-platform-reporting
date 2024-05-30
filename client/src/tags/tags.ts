import { tagFor } from '@genesislcap/foundation-ui';
import { DI } from '@genesislcap/web-core';
import { ReportingConfig } from '../config/config';
import { defaultTemplateOptions } from '../config/templates';

/**
 * It's important this file isn't referenced ahead of a `configure` call, otherwise these values may remain fixed at
 * their defaults. Consumers must use the `/config` subpath to help avoid this. Files with references to tags should be
 * lazily loaded. There is an alternative `getTags` utility at the end which could offer another approach, but direct
 * tag exports and inline template references feel cleaner than having to convert all component `template` and `styles`
 * exports to functions to call `getTags` on execution.
 */

/**
 * @internal
 */
export const { templateOptions = defaultTemplateOptions } =
  DI.getOrCreateDOMContainer().get(ReportingConfig);

/**
 * @internal
 */
export const iconTag = tagFor(templateOptions.icon);

/**
 * @internal
 */
export const buttonTag = tagFor(templateOptions.button);

/**
 * @internal
 */
export const cardTag = tagFor(templateOptions.card);

/**
 * @internal
 */
export const tabsTag = tagFor(templateOptions.tabs);

/**
 * @internal
 */
export const tabTag = tagFor(templateOptions.tab);
/**
 * @internal
 */
export const tabPanelTag = tagFor(templateOptions.tabPanel);
/**
 * @internal
 */
export const textFieldTag = tagFor(templateOptions.textField);
/**
 * @internal
 */
export const textAreaTag = tagFor(templateOptions.textArea);
/**
 * @internal
 */
export const radioGroupTag = tagFor(templateOptions.radioGroup);
/**
 * @internal
 */
export const radioTag = tagFor(templateOptions.radio);
/**
 * @internal
 */
export const toastTag = tagFor(templateOptions.toast);
/**
 * @internal
 */
export const designSystemProviderTag = tagFor(templateOptions.designSystemProvider);
/**
 * @internal
 */
export const gridTag = tagFor(templateOptions.grid);
