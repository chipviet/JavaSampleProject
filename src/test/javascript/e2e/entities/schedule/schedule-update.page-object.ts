import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ScheduleUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.schedule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  weekDaySelect: ElementFinder = element(by.css('select#schedule-weekDay'));
  startInput: ElementFinder = element(by.css('input#schedule-start'));
  tutorDetailsSelect: ElementFinder = element(by.css('select#schedule-tutorDetails'));
  courseSelect: ElementFinder = element(by.css('select#schedule-course'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setWeekDaySelect(weekDay) {
    await this.weekDaySelect.sendKeys(weekDay);
  }

  async getWeekDaySelect() {
    return this.weekDaySelect.element(by.css('option:checked')).getText();
  }

  async weekDaySelectLastOption() {
    await this.weekDaySelect.all(by.tagName('option')).last().click();
  }
  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async tutorDetailsSelectLastOption() {
    await this.tutorDetailsSelect.all(by.tagName('option')).last().click();
  }

  async tutorDetailsSelectOption(option) {
    await this.tutorDetailsSelect.sendKeys(option);
  }

  getTutorDetailsSelect() {
    return this.tutorDetailsSelect;
  }

  async getTutorDetailsSelectedOption() {
    return this.tutorDetailsSelect.element(by.css('option:checked')).getText();
  }

  async courseSelectLastOption() {
    await this.courseSelect.all(by.tagName('option')).last().click();
  }

  async courseSelectOption(option) {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect() {
    return this.courseSelect;
  }

  async getCourseSelectedOption() {
    return this.courseSelect.element(by.css('option:checked')).getText();
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
    await this.weekDaySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setStartInput('5');
    expect(await this.getStartInput()).to.eq('5');
    await this.tutorDetailsSelectLastOption();
    await this.courseSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
