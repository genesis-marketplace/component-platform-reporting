import { DI, GenesisElement, Registration } from '@genesislcap/web-core';
import { ReportingConfig, defaultReportingConfig } from './config';

/**
 * configure.
 *
 * @remarks
 * Configure the reporting micro frontend for host app integration.
 * 
 * @example Providing template options to align to your host application.
 * ```ts

 * const { configure } = await import('@genesislcap/pbc-reporting-ui/config');
 *  return configure({
 *    name: 'rapid-document-manager',
 *    templateOptions: {
 *     icon: 'rapid-icon',
 *     button: 'rapid-button',
 *     grid: 'rapid-grid-pro',
 *   },
 *   designSystemPrefix: 'rapid',
 *  });
 * },
 * ```
 *
 * This is just an example, as there is a `RapidReporting` which you can import and use.
 *
 * @param config - A partial ReportingConfig.
 * @public
 */
export async function configure(config: Partial<ReportingConfig>) {
  /**
   * Merge the configs
   */
  const value: ReportingConfig = {
    ...defaultReportingConfig,
    ...config,
  };
  if (config.templateOptions) {
    value.templateOptions = {
      ...defaultReportingConfig.templateOptions,
      designSystemProvider: 'template', // < we can assume by calling configure they will provide the design system.
      ...config.templateOptions,
    };
  }
  /**
   * Register a new ReportingConfig
   */
  DI.getOrCreateDOMContainer().register(
    Registration.instance<ReportingConfig>(ReportingConfig, value),
  );
  /**
   * Lazily reference and define the micro frontend element post config setting.
   */
  const { Reporting, MainStyles, MainTemplate } = await import(
    '../main'
  );
  const { name, attributes, shadowOptions, elementOptions } = value;
  return GenesisElement.define(Reporting, {
    name,
    template: MainTemplate,
    styles: MainStyles,
    attributes,
    shadowOptions,
    elementOptions,
  });
}
