import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TutorDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.tutorDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  literacyInput: ElementFinder = element(by.css('input#tutor-details-literacy'));
  efficencyInput: ElementFinder = element(by.css('input#tutor-details-efficency'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLiteracyInput(literacy) {
    await this.literacyInput.sendKeys(literacy);
  }

  async getLiteracyInput() {
    return this.literacyInput.getAttribute('value');
  }

  async setEfficencyInput(efficency) {
    await this.efficencyInput.sendKeys(efficency);
  }

  async getEfficencyInput() {
    return this.efficencyInput.getAttribute('value');
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
    await this.setLiteracyInput('literacy');
    expect(await this.getLiteracyInput()).to.match(/literacy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEfficencyInput('5');
    expect(await this.getEfficencyInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
