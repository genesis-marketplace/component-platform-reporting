// based on AgGrid filter model;
export type ReportFieldFilter = {
  name: string; // based on AgGrid filter model;
  filterType: string;
  displayName: string;
};

export const stringFilters: ReportFieldFilter[] = [
  { name: 'equals', displayName: 'Equals', filterType: 'text' },
  { name: 'notEqual', displayName: 'Not equal', filterType: 'text' },
  { name: 'contains', displayName: 'Contains', filterType: 'text' },
  { name: 'notContains', displayName: 'Not contains', filterType: 'text' },
  { name: 'startsWith', displayName: 'Starts with', filterType: 'text' },
  { name: 'endsWith', displayName: 'Ends with', filterType: 'text' },
];

export const booleanFilters: ReportFieldFilter[] = [
  { name: 'equals', displayName: 'Equals', filterType: 'text' },
  { name: 'notEqual', displayName: 'Not equal', filterType: 'text' },
];

export const numberFilters: ReportFieldFilter[] = [
  { name: 'equals', displayName: 'Equals', filterType: 'number' },
  { name: 'notEqual', displayName: 'Not equal', filterType: 'number' },
  { name: 'lessThan', displayName: 'Less than', filterType: 'number' },
  { name: 'lessThanEquals', displayName: 'Less than or equals', filterType: 'number' },
  { name: 'greaterThan', displayName: 'Greater than', filterType: 'number' },
  { name: 'greaterThanOrEquals', displayName: 'Greater than or equals', filterType: 'number' },
  { name: 'inRange', displayName: 'In range', filterType: 'number' },
];

export const dateFilters: ReportFieldFilter[] = [
  { name: 'equals', displayName: 'Equals', filterType: 'date' },
  { name: 'notEqual', displayName: 'Not equal', filterType: 'date' },
  { name: 'greaterThan', displayName: 'Greater than', filterType: 'date' },
  { name: 'lessThan', displayName: 'Less than', filterType: 'date' },
  { name: 'inRange', displayName: 'In range', filterType: 'date' },
];

export function getFiltersByFieldType(fieldType: string): ReportFieldFilter[] {
  switch (fieldType) {
    case 'ENUM':
    case 'STRING':
      return stringFilters;

    case 'BOOLEAN':
      return booleanFilters;

    case 'INT':
    case 'LONG':
    case 'DOUBLE':
    case 'BIGDECIMAL':
      return numberFilters;

    case 'DATE':
    case 'DATETIME':
      return dateFilters;
  }
}

export function getFilterTypeByFieldType(fieldType: string): string {
  switch (fieldType) {
    case 'ENUM':
    case 'STRING':
      return 'text';

    case 'BOOLEAN':
      return 'text';

    case 'INT':
    case 'LONG':
    case 'DOUBLE':
    case 'BIGDECIMAL':
      return 'number';

    case 'DATE':
    case 'DATETIME':
      return 'date';
  }
}
