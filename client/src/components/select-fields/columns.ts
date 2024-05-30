import type { GridOptions } from '@ag-grid-community/core';
import { defaultRowConfig } from '../../constants/grid-config';

/**
 * Field selection grid config
 */
export const FIELD_SELECT_CONFIG = {
  colDefs: [
    {
      checkboxSelection: true,
      filter: false,
      headerCheckboxSelection: true,
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Field Name',
    },
  ],
  gridOptions: {
    ...defaultRowConfig,
    defaultColDef: {
      filter: false,
      floatingFilter: false,
      sortable: false,
      sort: 'asc',
      suppressMenu: false,
      resizable: false,
    },
    debug: true,
  } as GridOptions,
};

/**
 * Selected fields config
 */
export const SELECTED_FIELDS_CONFIG = {
  colDefs: [
    {
      checkboxSelection: true,
      filter: false,
      headerCheckboxSelection: true,
      sortable: false,
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Column name',
    },
  ],
  gridOptions: {
    ...defaultRowConfig,
    defaultColDef: {
      filter: false,
      floatingFilter: false,
      sortable: false,
      suppressMenu: false,
      resizable: false,
    },
    animateRows: true,
    debug: true,
    rowDragManaged: true,
  },
};
