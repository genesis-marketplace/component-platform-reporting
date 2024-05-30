import { Connect } from '@genesislcap/foundation-comms';
import { RapidAgTextRenderer } from '@genesislcap/rapid-grid-pro';
import type { GridPro } from '@genesislcap/grid-pro';
import { customElement, GenesisElement, observable, attr } from '@genesislcap/web-core';
import { filterObjectArray, getSelectedFields } from '../../utils';
import { FIELD_SELECT_CONFIG, SELECTED_FIELDS_CONFIG } from './columns';
import { SelectFieldsStyles } from './select-fields.styles';
import { SelectFieldsTemplate } from './select-fields.template';
import { ReportingConfig } from '../../config/config';

@customElement({
  name: 'reporting-select-fields',
  template: SelectFieldsTemplate,
  styles: SelectFieldsStyles,
})
export class SelectFields extends GenesisElement {
  public allFieldsGrid: GridPro;
  public selectedFieldsGrid: GridPro;

  @Connect connect: Connect;
  @observable fieldsToRemove = [];
  @observable fieldData;
  @observable report = {};
  @observable selectedFields;
  @attr selectedDatasource: string = '';
  @ReportingConfig config!: ReportingConfig;

  /**
   * Loading selected fields grid when we have selected rows
   */
  selectedFieldsChanged(oldValue) {
    if (oldValue) {
      this.selectedFieldsGrid?.gridApi?.setRowData(this.selectedFields);
      this.selectedFieldsGrid?.gridApi?.refreshCells();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadAllFieldsGrid();
    this.loadSelectedFieldsGrid();
  }

  /**
   * As the current fieldsGrid does not have display name ctx, we need to make sure the text renderer field value is not lost
   * @param array Array
   * @returns Array
   */
  public makeSureFieldValueIsNotLost = (array) => {
    return array.map((field) => {
      const matchingField = this.selectedFields?.find((f) => f?.name === field?.name);
      return {
        ...field,
        ...matchingField,
      };
    });
  };

  /**
   * Update selected fields on parent component
   */
  public setSelectedFields(fields: { [key: string]: any }): void {
    this.$emit('setSelectedFields', { fields });
  }

  /**
   * Loads the allFieldsGrid
   */
  public async loadAllFieldsGrid(): Promise<void> {
    this.allFieldsGrid.gridOptions = {
      ...FIELD_SELECT_CONFIG.gridOptions,
      columnDefs: FIELD_SELECT_CONFIG.colDefs,
      rowData: [...this.fieldData],
      onSelectionChanged: () => {
        if (this.selectedFields) {
          this.selectedFields = getSelectedFields(this.allFieldsGrid, this.selectedFields);
          this.setSelectedFields([...this.makeSureFieldValueIsNotLost(this.selectedFields)]);
        } else {
          this.setSelectedFields([
            ...this.makeSureFieldValueIsNotLost(this.allFieldsGrid.gridApi.getSelectedRows()),
          ]);
        }
      },
      onFirstDataRendered: () => {
        this.allFieldsGrid?.gridApi?.sizeColumnsToFit();
        this.selectDefaultFields();
      },
      onGridReady: () => {
        window.addEventListener('resize', () => {
          setTimeout(() => {
            this.allFieldsGrid?.gridApi?.sizeColumnsToFit();
          });
        });
      },
    };
  }

  /**
   * Loads the allFieldsGrid
   */
  public async loadSelectedFieldsGrid(): Promise<void> {
    this.selectedFieldsGrid.gridOptions = {
      ...SELECTED_FIELDS_CONFIG.gridOptions,
      onRowDragEnd: this.refreshSelectFieldGridData,
      columnDefs: [
        ...SELECTED_FIELDS_CONFIG.colDefs,
        {
          field: 'displayName',
          headerName: 'Display name',
          cellRenderer: RapidAgTextRenderer,
          cellRendererParams: {
            accessor: 'displayName',
            onChange: this.onTextFieldChange,
          },
        },
        {
          rowDrag: true,
          width: 60,
          sortable: false,
          filter: false,
        },
      ],
      rowData: [],
      onGridReady: () => {
        window.addEventListener('resize', () => {
          setTimeout(() => {
            this.selectedFieldsGrid?.gridApi?.sizeColumnsToFit();
          });
        });
      },
      onFirstDataRendered: () => {
        this.selectedFieldsGrid?.gridApi?.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        this.fieldsToRemove = this.selectedFieldsGrid.gridApi.getSelectedRows();
      },
    };
  }

  /**
   * When text renderer text field changes handle
   * @param value string
   * @param params Object
   */
  public onTextFieldChange = async (value, params) => {
    const newFields = this.selectedFields.map((field) => {
      let newField = { ...field };
      if (field.name === params.node.data.name) {
        newField = {
          ...newField,
          displayName: value,
        };
      }
      return newField;
    });
    this.setSelectedFields(newFields);
  };

  /**
   * Refresh select field grid data
   */
  public refreshSelectFieldGridData = (): void => {
    const selectedFieldsOrder = [];
    this.selectedFieldsGrid.gridApi.forEachNodeAfterFilterAndSort((rowNode) => {
      selectedFieldsOrder.push(rowNode.data);
    });
    this.setSelectedFields([...this.makeSureFieldValueIsNotLost(selectedFieldsOrder)]);
  };

  /**
   * Remove fields from selected fields grid and deselect them from the available fields grid
   */
  public removeSelectedFields = (): void => {
    // filter fields from selected list
    const filteredFields = filterObjectArray('name', this.selectedFields, this.fieldsToRemove);
    this.setSelectedFields(filteredFields);

    // reset removal array
    this.fieldsToRemove = [];

    // deselect available fieldgrid
    this.allFieldsGrid.gridApi.deselectAll();

    // reselect
    this.allFieldsGrid.gridApi.forEachNode((node): void => {
      filteredFields.find((field) => field.name === node.data.name) && node.setSelected(true);
    });
  };

  /**
   * Select default fields
   */
  public selectDefaultFields(): void {
    if (this.selectedFields.length) {
      this.allFieldsGrid.gridApi.forEachNode((node) => {
        this.selectedFields.find((field) => field.name === node.data.name) &&
          node.setSelected(true);
      });
      this.setSelectedFields([...this.makeSureFieldValueIsNotLost(this.selectedFields)]);
    } else {
      this.selectedFields = [];
    }
  }
}
