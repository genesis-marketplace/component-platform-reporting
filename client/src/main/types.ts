export type Settings = {
  public?: boolean;
  resetPassword?: boolean;
  requestAccount?: boolean;
  forgotPassword?: boolean;
  logoSrc?: string;
  logoWidth?: string;
  logoHeight?: string;
  maxRows?: number;
  maxView?: number;
};

export type Notification = {
  type: string;
  title: string;
  message?: string;
  autoClose?: boolean;
};

export enum ReportingEventListeners {
  notify = 'notify',
  listReports = 'listReports',
  runReport = 'runReport',
  editReport = 'editReport',
}
