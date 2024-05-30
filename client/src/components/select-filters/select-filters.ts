import { Connect } from '@genesislcap/foundation-comms';
import { RapidAgSelectRenderer, RapidAgTextRenderer } from '@genesislcap/rapid-grid-pro';
import type { GridPro } from '@genesislcap/grid-pro';
import { customElement, GenesisElement, observable } from '@genesislcap/web-core';
import { filterObjectArray, getFiltersByFieldType } from '../../utils';
import { AVAILABLE_FIELDS_CONFIG, SELECTED_FILTERS_CONFIG } from './columns';
import { SelectFiltersStyles } from './select-filters.styles';
import { SelectFiltersTemplate } from './select-filters.template';
import { ReportingConfig } from '../../config/config';

@customElement({
  name: 'reporting-select-filters',
  template: SelectFiltersTemplate,
  styles: SelectFiltersStyles,
})
export class SelectFilters extends GenesisElement {
  public availableFieldsGrid!: GridPro;
  public selectedFiltersGrid!: GridPro;

  @Connect connect: Connect;
  @observable filtersToRemove = [];
  @observable selectedFields = [];
  @observable selectedFilters = [];
  @observable filterGridReady: boolean = false;
  @ReportingConfig config!: ReportingConfig;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadAvailableFieldsGrid();
    this.loadSelectedFiltersGrid();
  }

  // TODO: extract to util
  public makeSureFieldValueIsNotLost = (array) => {
    return array.map((field) => {
      const matchingField = this.selectedFilters?.find((f) => f?.name === field?.name);
      return {
        ...field,
        ...matchingField,
      };
    });
  };

  selectedFiltersChanged(): void {
    if (this.filterGridReady) {
      this.selectedFiltersGrid.gridApi.setRowData(this.selectedFilters);
      this.selectedFiltersGrid.gridApi.refreshCells();
    }
  }

  /**
   * Update selected filters on parent component
   */
  public setSelectedFilters(filters: { [key: string]: any }): void {
    this.$emit('setSelectedFilters', { filters });
  }

  /**
   * Get a simplified / normalized version of the filters
   * e.g. ['REPORT_ID', 'REPORT_NAME']
   * @returns Array of string
   */
  public getNormalizedFilters(): Array<string> {
    return this.selectedFilters?.map(({ FIELD_NAME }) => FIELD_NAME);
  }

  /**
   * Loads availableFieldsGrid with data from the field selection step
   */
  public async loadAvailableFieldsGrid(): Promise<void> {
    this.availableFieldsGrid.gridOptions = {
      ...AVAILABLE_FIELDS_CONFIG.gridOptions,
      columnDefs: AVAILABLE_FIELDS_CONFIG.colDefs,
      rowData: [...this.selectedFields],
      onGridReady: () => {
        window.addEventListener('resize', () => {
          setTimeout(() => {
            this.availableFieldsGrid?.gridApi?.sizeColumnsToFit();
          });
        });
      },
      onFirstDataRendered: () => {
        this.availableFieldsGrid?.gridApi?.sizeColumnsToFit();
        this.selectDefaultFilters();
      },
      onSelectionChanged: () => {
        this.setSelectedFilters([
          ...this.makeSureFieldValueIsNotLost(this.availableFieldsGrid.gridApi.getSelectedRows()),
        ]);
      },
    };
  }

  /**
   * Loads the selectedFiltersGrid
   */
  public loadSelectedFiltersGrid(): void {
    this.selectedFiltersGrid.gridOptions = {
      ...SELECTED_FILTERS_CONFIG.gridOptions,
      columnDefs: [
        ...SELECTED_FILTERS_CONFIG.colDefs,
        {
          field: 'TYPE',
          headerName: 'Filter',
          maxWidth: 170,
          cellStyle: {
            overflow: 'visible',
            paddingLeft: 0,
            paddingRight: 0,
          },
          cellRenderer: RapidAgSelectRenderer,
          cellRendererParams: {
            accessor: 'filter.conditional',
            defaultValue: 'Select filter',
            onSelect: this.onFilterSelect,
            options: (data) => getFiltersByFieldType(data.type),
          },
        },
        {
          cellRenderer: RapidAgTextRenderer,
          cellRendererParams: {
            onChange: this.onFilterValueChange,
            accessor: 'filter.value',
          },
          field: 'filter.value',
          headerName: 'Value',
        },
      ],
      rowData: [...this.filtersToRemove, ...this.selectedFilters],
      onGridReady: () => {
        this.filterGridReady = true;
        window.addEventListener('resize', () => {
          setTimeout(() => {
            this.selectedFiltersGrid?.gridApi?.sizeColumnsToFit();
          });
        });
      },
      onFirstDataRendered: () => {
        this.selectedFiltersGrid?.gridApi?.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        this.filtersToRemove = this.selectedFiltersGrid.gridApi.getSelectedRows();
      },
    };
  }

  public onFilterSelect = (value, params) => {
    const newFields = this.selectedFilters.map((field) => {
      if (field.name === params.node.data.name) {
        field.filter.conditional = value;
      }
      return field;
    });

    this.setSelectedFilters(newFields);
  };

  public onFilterValueChange = (value, params) => {
    const newFields = this.selectedFilters.map((field) => {
      if (field.name === params.node.data.name) {
        field.filter.value = value;
      }
      return field;
    });

    this.setSelectedFilters(newFields);
  };

  /**
   * Remove fields from selected filters grid and deselect them from the available fields grid
   */
  public removeSelectedFilters = (): void => {
    // filter fields from selected list
    const filters = filterObjectArray('name', this.selectedFilters, this.filtersToRemove);
    this.setSelectedFilters(filters);

    // reset removal array
    this.filtersToRemove = [];

    // deselect available fieldgrid
    this.availableFieldsGrid.gridApi.deselectAll();

    // reselect
    this.availableFieldsGrid.gridApi.forEachNode((node) => {
      filters.find((field) => field.name === node.data.name) && node.setSelected(true);
    });
  };

  /**
   * Select default filters
   */
  public selectDefaultFilters(): void {
    if (this.selectedFilters.length) {
      this.availableFieldsGrid.gridApi.forEachNode((node) => {
        this.selectedFilters.find((field) => field.name === node.data.name) &&
          node.setSelected(true);
      });
      this.setSelectedFilters([
        ...this.makeSureFieldValueIsNotLost(this.availableFieldsGrid.gridApi.getSelectedRows()),
      ]);
    }
  }
}
