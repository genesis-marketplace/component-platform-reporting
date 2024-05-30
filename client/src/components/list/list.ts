import type { ColDef } from '@ag-grid-community/core';
import { Connect } from '@genesislcap/foundation-comms';
import { GridPro, getActionsMenuDef } from '@genesislcap/grid-pro';
import { customElement, GenesisElement, observable } from '@genesislcap/web-core';
import { actionsOpenIcon } from '../../assets/images';
import { ReportingEventListeners } from '../../main/types';
import { ListStyles as styles } from './list.styles';
import { ListTemplate as template } from './list.template';
import { ReportingConfig } from '../../config/config';

const name = 'reporting-list';

@customElement({
  name,
  template,
  styles,
})
export class List extends GenesisElement {
  @Connect connect!: Connect;
  @observable userInteractedRow = {};
  @observable selectedRows = [];
  @ReportingConfig config!: ReportingConfig;

  public grid: GridPro;

  slectionEvent = new CustomEvent('rowSelectionEvent', {
    detail: { selectedRows: () => this.selectedRows },
  });

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    this.grid.addEventListener('onGridReady', () => {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.grid?.gridApi?.sizeColumnsToFit();
        });
      });
      this.grid.gridApi.addEventListener('firstDataRendered', () => {
        this.grid?.gridApi?.sizeColumnsToFit();
      });

      this.grid.gridApi.addEventListener('selectionChanged', () => {
        this.selectedRows = this.grid.gridApi.getSelectedRows();
        this.dispatchEvent(this.slectionEvent);
      });
    });
  }

  public async delete(rowData: any): Promise<void> {
    let notification = null;
    const { REPORT_ID } = rowData;

    const result = await this.connect.commitEvent('EVENT_SAVED_REPORTS_DELETE', {
      DETAILS: { REPORT_ID },
      IGNORE_WARNINGS: true,
      VALIDATE: false,
    });

    result.MESSAGE_TYPE === 'EVENT_ACK'
      ? (notification = {
          message: `'${rowData.REPORT_NAME}' was deleted`,
          title: 'Success:',
          type: 'success',
          autoClose: true,
        })
      : (notification = {
          message: `'${rowData.REPORT_NAME}' was not deleted due to the following error "${result.ERROR[0].TEXT}"`,
          title: 'Error:',
          type: 'warning',
          autoClose: true,
        });

    this.$emit(ReportingEventListeners.notify, notification);
  }

  public batchDelete(): void {
    // service does not accept arrays so have to loop
    this.selectedRows.forEach((rowData) => this.delete(rowData));
  }

  public runReport = (data: any): void => {
    this.$emit(ReportingEventListeners.runReport, data);
  };

  public actionsMenuSlottedConfig: ColDef = getActionsMenuDef(
    [
      {
        name: 'Edit',
        callback: (rowData) => {
          this.$emit(ReportingEventListeners.editReport, rowData);
        },
      },
      {
        name: 'Run',
        callback: (rowData) => {
          this.runReport(rowData);
        },
      },
      {
        name: 'Delete',
        callback: (rowData): void => {
          this.delete(rowData);
        },
        color: 'var(--error-color)',
      },
    ],
    {
      width: 60,
      headerName: '',
      filter: false,
      sortable: false,
      resizable: false,
      suppressMenu: true,
      cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      },
    },
    actionsOpenIcon(),
  );
}
