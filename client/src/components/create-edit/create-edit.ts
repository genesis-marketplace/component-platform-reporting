import { Connect } from '@genesislcap/foundation-comms';
import { customElement, GenesisElement, observable } from '@genesislcap/web-core';
import { ReportingEventListeners } from '../../main/types';
import { CreateEditStyles as styles } from './create-edit.styles';
import { CreateEditTemplate as template } from './create-edit.template';

const name = 'reporting-create-edit';

@customElement({
  name,
  template,
  styles,
})
export class CreateEdit extends GenesisElement {
  @Connect connect: Connect;
  @observable id!: string;
  @observable report: any = {};
  @observable datasourceSettings;

  /**
   * Trigger parent event listReports that navigates to list reports tab
   */
  public navigateToListReports() {
    this.$emit(ReportingEventListeners.listReports, {});
  }

  /**
   * Create report save handle
   */
  public saveReport = async (isEdit, body) => {
    let notification = null;
    const payload = {
      ...body,
      REPORT_COLUMNS: JSON.stringify(body['REPORT_COLUMNS']),
    };
    const event = isEdit ? 'EVENT_SAVED_REPORTS_UPDATE' : 'EVENT_SAVED_REPORTS_INSERT';
    const result = await this.connect.commitEvent(event, {
      DETAILS: {
        ...payload,
        ...(isEdit ? { REPORT_ID: this.report.REPORT_ID } : {}),
      },
      IGNORE_WARNINGS: true,
      VALIDATE: false,
    });
    if (result.MESSAGE_TYPE === 'EVENT_ACK') {
      notification = {
        message: `'${body.REPORT_NAME}' was added`,
        title: 'Success:',
        type: 'success',
        autoClose: true,
      };
      this.navigateToListReports();
    } else {
      notification = {
        message: `'${body.REPORT_NAME}' was not added due to the following error "${result.ERROR[0].TEXT}"`,
        title: 'Error:',
        type: 'warning',
        autoClose: true,
      };
    }
    this.$emit(ReportingEventListeners.notify, notification);
  };
}
