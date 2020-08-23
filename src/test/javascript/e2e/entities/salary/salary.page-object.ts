import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SalaryUpdatePage from './salary-update.page-object';

const expect = chai.expect;
export class SalaryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('tutorApp.salary.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-salary'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SalaryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('salary-heading'));
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
    await navBarPage.getEntityPage('salary');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSalary() {
    await this.createButton.click();
    return new SalaryUpdatePage();
  }

  async deleteSalary() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const salaryDeleteDialog = new SalaryDeleteDialog();
    await waitUntilDisplayed(salaryDeleteDialog.deleteModal);
    expect(await salaryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutorApp.salary.delete.question/);
    await salaryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(salaryDeleteDialog.deleteModal);

    expect(await isVisible(salaryDeleteDialog.deleteModal)).to.be.false;
  }
}
