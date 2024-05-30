import { Connect, DatasourceDefaults } from '@genesislcap/foundation-comms';
import type { Tabs } from '@genesislcap/foundation-ui';
import { customElement, GenesisElement, NavigationPhase, observable } from '@genesislcap/web-core';
import { List } from '../components/list';
import { MainStyles as styles } from './main.styles';
import { MainTemplate as template } from './main.template';
import { Notification, ReportingEventListeners, Settings } from './types';
import { ReportingConfig } from '../config/config';

/**
 * FoundationReporting.
 *
 * @remarks
 * Base MF export used by host application `configure` calls. It does not set up a design system or components. Both are
 * expected to be registered in the host application, which should provide the details of which to the MF via
 * TemplateOptions.
 *
 * See the {@link configure} hook for more information on how to set up and use this micro frontend in your application.
 *
 * @public
 */
@customElement({
  name: 'foundation-reporting',
  template,
  styles,
})
export class FoundationReporting extends GenesisElement {
  @Connect connect!: Connect;
  @observable fields: string[] = [];
  @observable selectedRows = [];
  @observable activeReport: any = {};
  @observable notifications: Notification[] = [];
  @observable datasourceSettings;
  @ReportingConfig config!: ReportingConfig;

  public listBox: HTMLElement;
  public reportsGrid!: List;
  public tabs: Tabs;

  async enter(phase: NavigationPhase<Settings>) {
    this.datasourceSettings = {
      maxRows: phase.route.settings?.maxRows ?? DatasourceDefaults.MAX_ROWS_250,
      maxView: phase.route.settings?.maxView ?? DatasourceDefaults.MAX_VIEW_1000,
    };
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    console.log('reporting config', this.config);
    this.reportsGrid.addEventListener('rowSelectionEvent', (e: CustomEvent) => {
      this.selectedRows = e.detail.selectedRows();
    });
    this.addEventListener(ReportingEventListeners.notify, (e: CustomEvent) => {
      this.notifications = [...this.notifications, e.detail];
    });
    this.addEventListener(ReportingEventListeners.listReports, (e: CustomEvent) => {
      this.setPageTab('list-reports');
      this.activeReport = {};
    });
    this.reportsGrid.addEventListener(ReportingEventListeners.runReport, (e: CustomEvent) => {
      this.run(e.detail);
    });
    this.reportsGrid.addEventListener(ReportingEventListeners.editReport, (e: CustomEvent) => {
      this.edit(e.detail);
    });
  }

  // TODO: use const for tab identifiers
  public create() {
    this.activeReport = {};
    this.setPageTab('create-edit-report');
  }

  public edit(rowData) {
    this.activeReport = {
      ...rowData,
      REPORT_COLUMNS: JSON.parse(rowData['REPORT_COLUMNS']),
    };
    this.setPageTab('create-edit-report');
  }

  public async run(rowData) {
    this.activeReport = {
      ...rowData,
      REPORT_COLUMNS: JSON.parse(rowData['REPORT_COLUMNS']),
    };
    this.setPageTab('run-report');
  }

  public setPageTab(tab: string) {
    this.tabs.activeid = tab;
  }

  public async getFields(resourceName: string) {
    const temp = await this.connect.getMetadata(resourceName);
    for (let i = 0; i < temp.FIELD.length; i += 1) {
      this.fields.push(temp.FIELD[i].NAME);
    }
    this.listBox.hidden = false;
  }
}

/**
 * RapidReporting.
 *
 * @remarks
 * A rapid version that pre-registers rapid components and uses the rapid design system.
 *
 * @example
 * ```ts
 * import { RapidReporting } from '@genesislcap/pbc-reporting-ui';
 * ...
 * RapidReporting
 * ```
 *
 * @example Load the micro frontend on-demand
 * ```ts

 *   const { RapidReporting } = await import('@genesislcap/pbc-reporting-ui');
 *   return RapidReporting;
 * },
 * ```
 *
 * @public
 */
@customElement({
  name: 'rapid-reporting',
  template,
  styles,
})
export class RapidReporting extends FoundationReporting {
  /**
   * @internal
   */
  async connectedCallback() {
    super.connectedCallback();
    await this.loadRemotes();
  }

  /**
   * @internal
   */
  protected async loadRemotes() {
    const { registerCommonRapidComponents } = await import('../components/rapid-components');
    await registerCommonRapidComponents();
  }
}

/**
 * ZeroReporting.
 *
 * @remarks
 * A zero version that pre-registers zero components and uses the zero design system.
 *
 * @example
 * ```ts
 * import { ZeroReporting } from '@genesislcap/pbc-reporting-ui';
 * ...
 * ZeroReporting
 * ```
 *
 * @example Load the micro frontend on-demand
 * ```ts

 *   const { ZeroReporting } = await import('@genesislcap/pbc-reporting-ui');
 *   return ZeroReporting;
 * },
 * ```
 *
 * @public
 */
@customElement({
  name: 'zero-reporting',
  template,
  styles,
})
export class ZeroReporting extends FoundationReporting {
  /**
   * @internal
   */
  async connectedCallback() {
    super.connectedCallback();
    await this.loadRemotes();
  }

  /**
   * @internal
   */
  protected async loadRemotes() {
    const { registerCommonZeroComponents } = await import('../components/zero-components');
    await registerCommonZeroComponents();
  }
}

/**
 * @privateRemarks
 * Keeps backwards compatability with original export.
 *
 * @public
 */
export class Reporting extends ZeroReporting {}
