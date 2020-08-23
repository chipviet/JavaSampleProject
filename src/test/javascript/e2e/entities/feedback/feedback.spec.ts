import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FeedbackComponentsPage from './feedback.page-object';
import FeedbackUpdatePage from './feedback-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Feedback e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let feedbackComponentsPage: FeedbackComponentsPage;
  let feedbackUpdatePage: FeedbackUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    feedbackComponentsPage = new FeedbackComponentsPage();
    feedbackComponentsPage = await feedbackComponentsPage.goToPage(navBarPage);
  });

  it('should load Feedbacks', async () => {
    expect(await feedbackComponentsPage.title.getText()).to.match(/Feedbacks/);
    expect(await feedbackComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Feedbacks', async () => {
    const beforeRecordsCount = (await isVisible(feedbackComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(feedbackComponentsPage.table);
    feedbackUpdatePage = await feedbackComponentsPage.goToCreateFeedback();
    await feedbackUpdatePage.enterData();

    expect(await feedbackComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(feedbackComponentsPage.table);
    await waitUntilCount(feedbackComponentsPage.records, beforeRecordsCount + 1);
    expect(await feedbackComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await feedbackComponentsPage.deleteFeedback();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(feedbackComponentsPage.records, beforeRecordsCount);
      expect(await feedbackComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(feedbackComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
