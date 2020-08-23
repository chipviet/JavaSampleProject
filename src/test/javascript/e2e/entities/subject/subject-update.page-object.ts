import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SubjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.subject.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameSubjectInput: ElementFinder = element(by.css('input#subject-nameSubject'));
  tutorDetailsSelect: ElementFinder = element(by.css('select#subject-tutorDetails'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameSubjectInput(nameSubject) {
    await this.nameSubjectInput.sendKeys(nameSubject);
  }

  async getNameSubjectInput() {
    return this.nameSubjectInput.getAttribute('value');
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
    await this.setNameSubjectInput('nameSubject');
    expect(await this.getNameSubjectInput()).to.match(/nameSubject/);
    await this.tutorDetailsSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
