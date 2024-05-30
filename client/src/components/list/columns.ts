import type { ColDef } from '@ag-grid-community/core';
import { formatDateTimestamp } from '@genesislcap/foundation-utils';

export enum REPORT_FIELDS {
  REPORT_ID = 'REPORT_ID',
  REPORT_NAME = 'REPORT_NAME',
  REPORT_DESCRIPTION = 'REPORT_DESCRIPTION',
  REPORT_DATASOURCE = 'REPORT_DATASOURCE',
  REPORT_COLUMNS = 'REPORT_COLUMNS',
  CREATED_BY = 'CREATED_BY',
  REPORT_CREATED_ON = 'REPORT_CREATED_ON',
  OPTIONS = 'OPTIONS',
}

export function REPORT_COLUMN_DEFS(context: any) {
  let retval: Array<ColDef> = [];
  retval = [
    {
      checkboxSelection: true,
      filter: false,
      headerCheckboxSelection: true,
      sortable: false,
      width: 60,
      cellStyle: { display: 'flex' },
    },
    { field: REPORT_FIELDS.REPORT_ID, hide: true },
    { field: REPORT_FIELDS.REPORT_COLUMNS, hide: true },
    {
      field: REPORT_FIELDS.REPORT_NAME,
      headerName: 'Report Name',
      cellStyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        color: 'var(--accent-fill-rest)',
      },
      cellRendererSelector: (params) => {
        return {
          component: 'action',
          params: {
            actionClick: () => context.runReport(params?.node?.data),
            actionName: params?.value,
            appearance: 'lightweight',
          },
        };
      },
    },
    { field: REPORT_FIELDS.REPORT_DESCRIPTION, headerName: 'Description', width: 400 },
    { field: REPORT_FIELDS.REPORT_DATASOURCE, headerName: 'Datasource' },
    { field: REPORT_FIELDS.CREATED_BY, headerName: 'Author' },
    {
      field: REPORT_FIELDS.REPORT_CREATED_ON,
      headerName: 'Created date',
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: number) => {
          if (!cellValue) return -1;

          const cellValueTime = new Date(cellValue).setHours(0, 0, 0, 0);
          const filterValueTime = filterLocalDateAtMidnight.getTime();

          if (cellValueTime === filterValueTime) {
            return 0;
          }

          if (cellValueTime < filterValueTime) {
            return -1;
          }

          if (cellValueTime > filterValueTime) {
            return 1;
          }
        },
        buttons: ['reset', 'apply'],
        closeOnApply: true,
        closeOnClear: true,
        suppressAndOrCondition: true,
        browserDatePicker: true,
        filterOptions: ['equals', 'lessThan', 'greaterThan'],
      },
      valueFormatter: (rowData) => formatDateTimestamp(rowData.data.REPORT_CREATED_ON),
    },
    {
      width: 100,
      headerName: 'Actions',
      filter: false,
      resizable: false,
      sortable: false,
      cellStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      cellRendererSelector: (params) => {
        return {
          component: 'action',
          params: {
            actionClick: () => context.runReport(params?.node?.data),
            actionName: 'Run',
            appearance: context.config.buttonAppearance,
          },
        };
      },
    },
  ];
  return retval;
}

export function SELECTED_COLUMN_DEFS(context: any) {}
