import { formatDateTimestamp, formatDateTimeTimestamp } from '@genesislcap/foundation-utils';
import { defaultCellConfig } from '../../constants/grid-config';

export const getColumns = (columns) => [
  ...columns.map(({ name, displayName, type }) => {
    return {
      field: name,
      headerName: displayName,
      filter: 'agTextColumnFilter',
      valueFormatter:
        type === 'DATE'
          ? (rowData) => formatDateTimestamp(rowData.data[name])
          : type === 'DATETIME'
          ? (rowData) => formatDateTimeTimestamp(rowData.data[name])
          : '',
    };
  }),
];

export const getGridOptions = () => {
  return {
    defaultColDef: {
      ...defaultCellConfig,
      filter: true,
      floatingFilter: false,
      sortable: false,
      suppressMenu: false,
      resizable: false,
    },
  };
};
