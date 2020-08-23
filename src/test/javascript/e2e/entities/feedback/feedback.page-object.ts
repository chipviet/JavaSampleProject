import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FeedbackUpdatePage from './feedback-update.page-object';

const expect = chai.expect;
export class FeedbackDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('tutorApp.feedback.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-feedback'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FeedbackComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('feedback-heading'));
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
    await navBarPage.getEntityPage('feedback');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFeedback() {
    await this.createButton.click();
    return new FeedbackUpdatePage();
  }

  async deleteFeedback() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const feedbackDeleteDialog = new FeedbackDeleteDialog();
    await waitUntilDisplayed(feedbackDeleteDialog.deleteModal);
    expect(await feedbackDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutorApp.feedback.delete.question/);
    await feedbackDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(feedbackDeleteDialog.deleteModal);

    expect(await isVisible(feedbackDeleteDialog.deleteModal)).to.be.false;
  }
}
