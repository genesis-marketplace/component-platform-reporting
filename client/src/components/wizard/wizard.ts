import { Connect } from '@genesislcap/foundation-comms';
import { customElement, GenesisElement, observable, volatile } from '@genesislcap/web-core';
import { ReportingEventListeners } from '../../main/types';
import { FiltersStep, NameStep, RunStep, SelectStep } from './steps';
import { WizardStyles as styles } from './wizard.styles';
import { WizardTemplate as template } from './wizard.template';
import {
  DatasourceFieldOptions,
  DatasourceOptions,
  ReportField,
  WizardContent,
  WizardStep,
} from './wizard.types';
import { ReportingConfig } from '../../config/config';

const name = 'reporting-wizard';
@customElement({
  name,
  template,
  styles,
})
export class Wizard extends GenesisElement {
  @Connect connect: Connect;
  @ReportingConfig config!: ReportingConfig;
  @observable debug: boolean = false;
  @observable activeTab: number = 0;
  @observable datasourceOptions: DatasourceOptions = [];
  @observable datasourceFieldOptions: DatasourceFieldOptions = [];
  @observable isEdit: boolean = false;
  @observable fieldData: ReportField[] = [];
  @observable report;
  @observable saveReport;
  @observable content: WizardContent = [
    {
      title: 'Set up & Datasource',
      description:
        "Please give your new report a name, brief description and select it's datasource to get started.",
    },
    {
      title: 'Set fields',
      description: '',
    },
    {
      title: 'Apply filters',
      description: '(Optional)',
    },
    {
      title: 'Run report',
      description: '',
    },
  ];
  @observable datasourceSettings;

  // Set name and datasource step
  @observable reportName: string = '';
  @observable reportDescription: string = '';
  @observable selectedDatasource: string = null;

  // Set fields step
  @observable selectedFields: ReportField[] = [];

  // Set filters step
  @observable selectedFilters = [];

  // Run / preview report step
  @observable previewData: any[] = [];
  @observable previewGridColumns = [];

  @volatile
  get isFormValid() {
    // Note: This is a very basic form validation. Would be nice to know if there are any existing form validation tools that we've used in the past and implement it here.
    switch (this.activeTab) {
      // Set up & Datasource Step
      case WizardStep.Zero:
        return this.reportName !== '' && this.selectedDatasource !== null ? false : true;
      // Set columns Step
      case WizardStep.One:
        return !this.selectedFields.length;
      // Set filters Step
      case WizardStep.Two:
        return false;
      // Run report Step
      case WizardStep.Three:
        return false;
      default:
        return false;
    }
  }

  @volatile
  get viewTemplate() {
    switch (this.activeTab) {
      case WizardStep.Zero:
        return NameStep;
      case WizardStep.One:
        return SelectStep;
      case WizardStep.Two:
        return FiltersStep;
      case WizardStep.Three:
        return RunStep;
      default:
        throw new Error(`Cannot get template for state ${this.activeTab}`);
    }
  }

  /**
   * When report variable changes handle
   */
  async reportChanged(old, newValue) {
    this.fieldData = this.fieldData?.map(({ filter, ...fields }) => fields);
    if (Object.keys(newValue).length) {
      const {
        REPORT_NAME,
        REPORT_DESCRIPTION,
        REPORT_DATASOURCE,
        REPORT_DATA_SOURCE,
        REPORT_COLUMNS,
      } = newValue;
      this.isEdit = true;
      this.selectedFields = REPORT_COLUMNS;
      this.reportName = REPORT_NAME;
      this.reportDescription = REPORT_DESCRIPTION;
      this.selectedDatasource = REPORT_DATASOURCE || REPORT_DATA_SOURCE;
    } else {
      this.isEdit = false;
      this.reportName = '';
      this.reportDescription = '';
      this.selectedDatasource = null;
      this.selectedFields = [];
      this.selectedFilters = [];
    }
    this.setActiveTab(0);
  }

  /**
   * Set selected fields
   * @param fields array
   */
  public setFields(fields) {
    this.selectedFields = fields;
  }

  /**
   * When report variable changes handle
   */
  async selectedDatasourceChanged(old, newValue) {
    // Reset
    this.selectedFields = [];
    this.selectedFilters = [];
    this.fieldData = [];

    // Prepare field data structure from field metadata response
    const fieldMetadata = await this.fetchFieldsFromDatasource();
    if (this.isEdit && Object.keys(this.report).length) {
      this.selectedFields = this.report['REPORT_COLUMNS'];
      const reportDatasource =
        this.report['REPORT_DATASOURCE'] || this.report['REPORT_DATA_SOURCE'];
      if (reportDatasource === newValue) {
        this.fieldData = fieldMetadata.map(
          ({ FIELD_NAME, TYPE }) =>
            this.selectedFields.find((field) => field.name === FIELD_NAME) || {
              name: FIELD_NAME,
              type: TYPE,
              displayName: FIELD_NAME,
              selected: false,
            },
        );
      }
    } else {
      fieldMetadata?.forEach(({ FIELD_NAME, TYPE }) => {
        this.fieldData = [
          ...this.fieldData,
          {
            name: FIELD_NAME,
            type: TYPE,
            displayName: FIELD_NAME,
            selected: false,
          },
        ];
      });
    }
  }

  /**
   * Make sure to update selected fields when field data changes
   */
  fieldDataChanged() {
    this.selectedFields =
      this.selectedFields?.map((f) => {
        const matchingField = this.fieldData?.find((field) => field?.name === f?.name);
        return {
          ...matchingField,
          displayName: matchingField?.displayName || f?.name,
          selected: matchingField ? true : false,
        };
      }) || [];
    this.selectedFilters = this.fieldData?.filter((field) => field.filter && field.selected) || [];
  }

  public connectedCallback() {
    super.connectedCallback();
    this.getDatasources();
    this.addEventListener('setSelectedFields', (e: CustomEvent) => {
      this.selectedFields = e?.detail?.fields;
      this.fieldData = this.fieldData?.map((field) => {
        const matchingField = this.selectedFields.find((f) => f?.name === field?.name);
        return {
          ...field,
          ...matchingField,
          displayName: matchingField?.displayName || field?.name,
          selected: matchingField ? true : false,
        };
      });
    });
    this.addEventListener('setSelectedFilters', (e: CustomEvent) => {
      this.fieldData = this.fieldData?.map((field) => {
        const matchingField = e?.detail?.filters?.find((f) => f?.name === field?.name);

        if (matchingField) {
          matchingField.filter = {
            ...matchingField.filter,
          };
        } else {
          delete field?.filter;
        }

        return {
          ...field,
          ...matchingField,
        };
      });
    });
  }

  /**
   * Get a simplified / normalized version of the fields
   * e.g. ['REPORT_ID', 'REPORT_NAME']
   * @returns Array of string
   */
  public getNormalizedSelectedFields = () =>
    this.selectedFields?.map((field) => field.displayName) || [];

  /**
   * Get normalized selected filters context
   * @returns Array of strings
   */
  public getNormalizedSelectedFilters = () =>
    this.selectedFilters?.map(({ displayName }) => displayName) || [];

  /**
   * Fetch a list of datasources
   */
  private async getDatasources() {
    await this.connect
      .request('ALL_REPORT_DATASOURCES', {
        REQUEST: {},
      })
      .then((response) => {
        response?.REPLY?.forEach(({ DATASOURCE_NAME, RECORD_ID }) => {
          this.datasourceOptions = [
            ...this.datasourceOptions,
            {
              id: RECORD_ID,
              name: DATASOURCE_NAME,
            },
          ];
        });
      })
      .catch((err) => {
        this.$emit(ReportingEventListeners.notify, {
          type: 'warning',
          title: 'Error:',
          message: `There was an error fetching data sources:
          ${err?.ERROR ? err.ERROR : JSON.stringify(err)}
        `,
        });
      });
  }

  /**
   * Fetch data from the provided datasource
   */
  private fetchFieldsFromDatasource(): Promise<any> {
    return (
      this.selectedDatasource &&
      this.connect
        .getMetadata(this.selectedDatasource)
        .then((response) => {
          if (response.ERROR) {
            this.$emit(ReportingEventListeners.notify, {
              type: 'warning',
              title: 'Error:',
              message: `The application encountered an error while trying to fetch fields
              ${this.selectedDatasource && `for data source "${this.selectedDatasource}"`}: 
              ${response.ERROR} 
            `,
            });
          }
          const fields = response?.FIELD || response?.REPLY_FIELD;
          return fields?.map(({ NAME, TYPE }) => ({ FIELD_NAME: NAME, TYPE }));
        })
        .catch((err) => {
          this.$emit(ReportingEventListeners.notify, {
            type: 'warning',
            title: 'Error:',
            message: err?.ERROR ? err.ERROR : JSON.stringify(err),
          });
        })
    );
  }

  /**
   * On datasource radio group change event handler
   * @param selection Number
   */
  public onDatasourceChange = (selection) => {
    this.selectedDatasource = selection;
  };

  /**
   * Get report context data
   * @returns Object
   */
  public getData = () => {
    return {
      REPORT_NAME: this.reportName,
      REPORT_DESCRIPTION: this.reportDescription,
      REPORT_COLUMNS: this.selectedFields,
      REPORT_DATA_SOURCE: this.selectedDatasource,
    };
  };

  /**
   * Set the current active tab
   * @param tab Number
   */
  public setActiveTab = (tabIndex) => {
    if (this.content[tabIndex]) {
      this.activeTab = tabIndex;
    }
  };
}
