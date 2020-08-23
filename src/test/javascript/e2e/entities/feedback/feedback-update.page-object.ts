import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FeedbackUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutorApp.feedback.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  commentInput: ElementFinder = element(by.css('input#feedback-comment'));
  ratingInput: ElementFinder = element(by.css('input#feedback-rating'));
  classIdSelect: ElementFinder = element(by.css('select#feedback-classId'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return this.ratingInput.getAttribute('value');
  }

  async classIdSelectLastOption() {
    await this.classIdSelect.all(by.tagName('option')).last().click();
  }

  async classIdSelectOption(option) {
    await this.classIdSelect.sendKeys(option);
  }

  getClassIdSelect() {
    return this.classIdSelect;
  }

  async getClassIdSelectedOption() {
    return this.classIdSelect.element(by.css('option:checked')).getText();
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
    await this.setCommentInput('comment');
    expect(await this.getCommentInput()).to.match(/comment/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRatingInput('5');
    expect(await this.getRatingInput()).to.eq('5');
    await this.classIdSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
