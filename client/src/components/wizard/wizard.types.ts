export interface FieldItem {
  FIELD_NAME: string;
  TYPE: string;
}

interface WizardStepContent {
  title: string;
  description?: string;
}

export interface WizardContent extends Array<WizardStepContent> {}

interface DatasourceReply {
  id: number;
  name: string;
}

export interface DatasourceOptions extends Array<DatasourceReply> {}

interface DatasourceField {
  FIELD_NAME: string;
  DISPLAY_NAME?: string;
}
export interface DatasourceFieldOptions extends Array<DatasourceField> {}

export type ReportFieldFilter = {
  conditional: string;
  value: string;
};
export interface ReportField {
  name: string;
  selected: Boolean;
  type: string;
  displayName?: string;
  filter?: ReportFieldFilter;
}

export enum WizardStep {
  Zero = 0,
  One,
  Two,
  Three,
}
