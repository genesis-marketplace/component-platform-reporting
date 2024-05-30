import { defaultCellConfig, defaultRowConfig } from '../../constants/grid-config';

/**
 * Field selection grid config
 */
export const AVAILABLE_FIELDS_CONFIG = {
  colDefs: [
    {
      checkboxSelection: true,
      filter: false,
      headerCheckboxSelection: true,
      sortable: false,
      width: 60,
    },
    {
      field: 'displayName',
      headerName: 'Field Name',
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
    debug: true,
  },
};

/**
 * Columns main dummy data
 */
export const SELECTED_FILTERS_CONFIG = {
  colDefs: [
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60,
    },
    {
      field: 'displayName',
      headerName: 'Field Name',
    },
  ],
  gridOptions: {
    ...defaultRowConfig,
    defaultColDef: {
      ...defaultCellConfig,
      filter: false,
      resizable: false,
      sortable: false,
      suppressMenu: true,
    },
    suppressContextMenu: true,
    suppressRowTransform: true,
    debug: true,
  },
};
