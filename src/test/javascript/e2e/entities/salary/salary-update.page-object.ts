import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SalaryUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.salary.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  leverInput: ElementFinder = element(by.css('input#salary-lever'));
  conefficientInput: ElementFinder = element(by.css('input#salary-conefficient'));
  levelIdSelect: ElementFinder = element(by.css('select#salary-levelId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLeverInput(lever) {
    await this.leverInput.sendKeys(lever);
  }

  async getLeverInput() {
    return this.leverInput.getAttribute('value');
  }

  async setConefficientInput(conefficient) {
    await this.conefficientInput.sendKeys(conefficient);
  }

  async getConefficientInput() {
    return this.conefficientInput.getAttribute('value');
  }

  async levelIdSelectLastOption() {
    await this.levelIdSelect.all(by.tagName('option')).last().click();
  }

  async levelIdSelectOption(option) {
    await this.levelIdSelect.sendKeys(option);
  }

  getLevelIdSelect() {
    return this.levelIdSelect;
  }

  async getLevelIdSelectedOption() {
    return this.levelIdSelect.element(by.css('option:checked')).getText();
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
    await this.setLeverInput('5');
    expect(await this.getLeverInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setConefficientInput('5');
    expect(await this.getConefficientInput()).to.eq('5');
    await this.levelIdSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
