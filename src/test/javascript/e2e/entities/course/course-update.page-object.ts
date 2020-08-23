import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CourseUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.course.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  levelInput: ElementFinder = element(by.css('input#course-level'));
  basicTuitionInput: ElementFinder = element(by.css('input#course-basicTuition'));
  currencyCodeInput: ElementFinder = element(by.css('input#course-currencyCode'));
  subjectIdSelect: ElementFinder = element(by.css('select#course-subjectId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLevelInput(level) {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput() {
    return this.levelInput.getAttribute('value');
  }

  async setBasicTuitionInput(basicTuition) {
    await this.basicTuitionInput.sendKeys(basicTuition);
  }

  async getBasicTuitionInput() {
    return this.basicTuitionInput.getAttribute('value');
  }

  async setCurrencyCodeInput(currencyCode) {
    await this.currencyCodeInput.sendKeys(currencyCode);
  }

  async getCurrencyCodeInput() {
    return this.currencyCodeInput.getAttribute('value');
  }

  async subjectIdSelectLastOption() {
    await this.subjectIdSelect.all(by.tagName('option')).last().click();
  }

  async subjectIdSelectOption(option) {
    await this.subjectIdSelect.sendKeys(option);
  }

  getSubjectIdSelect() {
    return this.subjectIdSelect;
  }

  async getSubjectIdSelectedOption() {
    return this.subjectIdSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setLevelInput('level');
    expect(await this.getLevelInput()).to.match(/level/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBasicTuitionInput('5');
    expect(await this.getBasicTuitionInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrencyCodeInput('currencyCode');
    expect(await this.getCurrencyCodeInput()).to.match(/currencyCode/);
    await this.subjectIdSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
