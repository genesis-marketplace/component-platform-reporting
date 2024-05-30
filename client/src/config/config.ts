import { DI, PartialGenesisElementDefinition } from '@genesislcap/web-core';
import { defaultTemplateOptions, TemplateOptions } from './templates';

/**
 * Do not reference any ../main files here. We must avoid ../tags being referenced and therefore setup pre-configuration.
 */

/**
 * ReportingConfig DI interface.
 *
 * @public
 */
export interface ReportingConfig extends PartialGenesisElementDefinition {
  /**
   * Template options.
   *
   * @remarks
   * Used by host applications to assign MF template options and subcomponent tags to align with the host design system.
   */
  templateOptions: TemplateOptions;

  /**
   * Button appearance.
   *
   * @remarks
   * Used by foundation-button to specify the appearance of the button
   */
  buttonAppearance: string;

  /**
   * Design System prefix for foundation-form
   *
   * @remarks
   * Used by foundation-form to specify the design system used by the form elements
   */
  designSystemPrefix: string;
}

/**
 * Default ReportingConfig DI implementation.
 * @public
 */
export const defaultReportingConfig: ReportingConfig = {
  name: 'foundation-reporting',
  templateOptions: defaultTemplateOptions,
  designSystemPrefix: 'rapid',
  buttonAppearance: 'primary',
};

/**
 * ReportingConfig DI key.
 *
 * @internal
 * @privateRemarks
 * Marked as internal to stop api-extractor becoming confused cross-linking tokens with the same name.
 */
export const ReportingConfig = DI.createInterface<ReportingConfig>((x) => x.instance(defaultReportingConfig));
