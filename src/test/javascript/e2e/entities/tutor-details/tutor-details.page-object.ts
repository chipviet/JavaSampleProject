import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TutorDetailsUpdatePage from './tutor-details-update.page-object';

const expect = chai.expect;
export class TutorDetailsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('tutorApp.tutorDetails.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-tutorDetails'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TutorDetailsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tutor-details-heading'));
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
    await navBarPage.getEntityPage('tutor-details');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTutorDetails() {
    await this.createButton.click();
    return new TutorDetailsUpdatePage();
  }

  async deleteTutorDetails() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const tutorDetailsDeleteDialog = new TutorDetailsDeleteDialog();
    await waitUntilDisplayed(tutorDetailsDeleteDialog.deleteModal);
    expect(await tutorDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutorApp.tutorDetails.delete.question/);
    await tutorDetailsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tutorDetailsDeleteDialog.deleteModal);

    expect(await isVisible(tutorDetailsDeleteDialog.deleteModal)).to.be.false;
  }
}
