import { html, repeat, ref, when, ViewTemplate } from "@genesislcap/web-core";
import { List } from "../components/list";
import { Wizard } from "../components/wizard";
import { Preview } from "../components/preview";
import { SelectFields } from "../components/select-fields";
import { SelectFilters } from "../components/select-filters";
import { CreateEdit } from "../components/create-edit";
import { LayoutTwoPaneHorizontal } from "../layouts";
import type { Reporting } from "./main";
import {
  buttonTag,
  tabPanelTag,
  tabTag,
  tabsTag,
  toastTag,
} from "../tags";

List;
Preview;
SelectFields;
SelectFilters;
Wizard;
CreateEdit;
LayoutTwoPaneHorizontal;

const notificationToast: ViewTemplate<Reporting> = html`
  <div class="notification-container" data-test-id="notification-container">
    ${repeat(
      (x) => x.notifications,
      html`
        <${toastTag}
          notify=${(notification) => notification.type}
          auto-close=${(notification) => notification.autoClose}
          data-test-id="toast"
        >
          <div slot="top" data-test-id="toast-title">${(notification) =>
            notification.title}</div>
          <p slot="content" data-test-id="toast-message">
            ${(notification) => notification.message}
          </p>
        </${toastTag}>
      `
    )}
  </div>
`;

const header: ViewTemplate<Reporting> = html`
  <div class="header" data-test-id="header">
    <h1 id="title" class="title" data-test-id="report-title">All Reports</h1>
    <div class="controls" data-test-id="controls">
      <${buttonTag}
        appearance="neutral-grey"
        class="button"
        ?disabled=${(x) => !x.selectedRows.length}
        @click=${(x) => x.reportsGrid.batchDelete()}
        data-test-id="delete-reports-button"
      >
        Delete Reports
      </${buttonTag}>

      <${buttonTag}
        appearance="${(x) => x.config.buttonAppearance}"
        class="button"
        @click=${(x) => x.create()}
        data-test-id="add-report-button"
      >
        Add new report
      </${buttonTag}>
    </div>
  </div>
`;

export const MainTemplate = html<Reporting>`
  ${when((x) => x.notifications.length, notificationToast)}
  <div class="container" data-test-id="reporting-home">

      <${tabsTag} ${ref("tabs")} class="tabs" data-test-id="tabs">
        <span part="start" class="start" slot="start" data-test-id="reporting-tab">Reporting</span>
        <${tabTag} id="list-reports" slot="tab" data-test-id="list-reports-tab">
          All Reports
        </${tabTag}>
        <${tabTag} id="create-edit-report" slot="tab" data-test-id="create-edit-report-tab">
          Create Report
        </${tabTag}>
        ${when(
          (x) => Object.keys(x.activeReport).length > 0,
          html`
            <${tabTag} id="run-report" slot="tab" data-test-id="run-report-tab">Run Report</${tabTag}>
          `
        )}

        <${tabPanelTag} slot="tabpanel" class="tab-panel" data-test-id="list-reports-panel">
          ${header}
          <reporting-list ${ref(
            "reportsGrid"
          )} data-test-id="report-list"></reporting-list>
        </${tabPanelTag}>

        <${tabPanelTag} slot="tabpanel" class="tab-panel" data-test-id="create-edit-report-panel">
          <reporting-create-edit
            :report=${(x) => x.activeReport}
            :setPageTab=${(x) => x.setPageTab}
            :datasourceSettings=${(x) => x.datasourceSettings}
            data-test-id="create-edit-report-component"
          />
        </${tabPanelTag}>
        ${when(
          (x) => Object.keys(x.activeReport).length > 0,
          html`
            <${tabPanelTag} slot="tabpanel" class="tab-panel" data-test-id="report-preview-panel">
              <reporting-preview
                :report=${(x) => x.activeReport}
                :datasourceSettings=${(x) => x.datasourceSettings}
                data-test-id="report-preview-component"
              />
            </${tabPanelTag}>
          `
        )}
      </${tabsTag}>

  </div>
`;
