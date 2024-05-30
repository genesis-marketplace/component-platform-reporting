import { Datasource, FilteredDataServerResult } from '@genesislcap/foundation-comms';
import { formatDateTimestamp, formatDateTimeTimestamp } from '@genesislcap/foundation-utils';
import type { GridPro } from '@genesislcap/grid-pro';
import { customElement, GenesisElement, observable, attr } from '@genesislcap/web-core';
import { getColumns, getGridOptions } from './columns';
import { PreviewStyles as styles } from './preview.styles';
import { PreviewReportTemplate as template } from './preview.template';
import { ReportingConfig } from '../../config/config';

const name = 'reporting-preview';

@customElement({
  name,
  template,
  styles,
})
export class Preview extends GenesisElement {
  public grid!: GridPro;
  @Datasource datasource!: Datasource;
  @attr report: any = {};
  @observable data: FilteredDataServerResult;
  @observable datasourceSettings;
  @ReportingConfig config!: ReportingConfig;

  /**
   * When report variable changes handle
   */
  reportChanged(old, newValue) {
    // Skip if empty report object
    if (
      old &&
      Object.keys(old).length != 0 &&
      Object.keys(newValue).length > 0 &&
      (newValue['REPORT_DATASOURCE'] || newValue['REPORT_DATA_SOURCE'])
    ) {
      this.fetchAndLoadToGrid();
    }
  }

  /**
   * On component load
   */
  connectedCallback() {
    super.connectedCallback();
    this.fetchAndLoadToGrid();
    this.grid.addEventListener('onGridReady', () => {
      const model = {};
      this.report['REPORT_COLUMNS']
        .filter((f) => f.filter)
        .forEach((f) => {
          model[f.name] = {
            filterType: 'text',
            type: f.filter.conditional,
            filter: f.filter.value,
          };
        });
      this.grid.gridApi.setFilterModel(model);
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.grid?.columnApi?.autoSizeAllColumns();
        });
      });
      this.grid.gridApi.addEventListener('firstDataRendered', () => {
        this.grid?.columnApi?.autoSizeAllColumns();
      });
    });
  }

  /**
   * Fetch data from server and load to grid
   */
  public fetchAndLoadToGrid = async () => {
    // Get the data from the selected dataserver
    // NOTE: Backend field REPORT_DATASOURCE and REPORT_DATA_SOURCE are not consistent in Events and Dataserver
    const resourceName = this.report['REPORT_DATASOURCE'] || this.report['REPORT_DATA_SOURCE'];

    await this.datasource.init({ resourceName, ...this.datasourceSettings }, true);

    this.data = await this.datasource.snapshotFiltered();

    // Map data from dataserver to the grid
    this.grid['gridOptions'] = {
      ...getGridOptions(),
      columnDefs: getColumns(this.report['REPORT_COLUMNS']),
      rowData: this.data as any[],
    };
  };

  /**
   * Export to csv handle
   */
  public exportToCsv = () => {
    const params: any = {
      fileName: 'export.csv',
    };
    params.processCellCallback = (cellParams) => this.formatDateType(cellParams);

    this.grid.gridApi.exportDataAsCsv({
      ...params,
    });
  };

  public formatDateType = (cellParams) => {
    let dateFormatter;
    this.report['REPORT_COLUMNS'].forEach((column) => {
      if (column.name == cellParams.column.colId) {
        column.type === 'DATE'
          ? (dateFormatter = formatDateTimestamp(cellParams.value))
          : column.type === 'DATETIME'
          ? (dateFormatter = formatDateTimeTimestamp(cellParams.value))
          : (dateFormatter = cellParams.value);
      }
    });
    return dateFormatter;
  };
}
