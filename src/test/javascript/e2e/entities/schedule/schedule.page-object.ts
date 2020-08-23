import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ScheduleUpdatePage from './schedule-update.page-object';

const expect = chai.expect;
export class ScheduleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('tutorApp.schedule.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-schedule'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ScheduleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('schedule-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('schedule');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSchedule() {
    await this.createButton.click();
    return new ScheduleUpdatePage();
  }

  async deleteSchedule() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const scheduleDeleteDialog = new ScheduleDeleteDialog();
    await waitUntilDisplayed(scheduleDeleteDialog.deleteModal);
    expect(await scheduleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutorApp.schedule.delete.question/);
    await scheduleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(scheduleDeleteDialog.deleteModal);

    expect(await isVisible(scheduleDeleteDialog.deleteModal)).to.be.false;
  }
}
