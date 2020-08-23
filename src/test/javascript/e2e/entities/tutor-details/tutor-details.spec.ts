import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TutorDetailsComponentsPage from './tutor-details.page-object';
import TutorDetailsUpdatePage from './tutor-details-update.page-object';
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

describe('TutorDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tutorDetailsComponentsPage: TutorDetailsComponentsPage;
  let tutorDetailsUpdatePage: TutorDetailsUpdatePage;

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
    tutorDetailsComponentsPage = new TutorDetailsComponentsPage();
    tutorDetailsComponentsPage = await tutorDetailsComponentsPage.goToPage(navBarPage);
  });

  it('should load TutorDetails', async () => {
    expect(await tutorDetailsComponentsPage.title.getText()).to.match(/Tutor Details/);
    expect(await tutorDetailsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TutorDetails', async () => {
    const beforeRecordsCount = (await isVisible(tutorDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tutorDetailsComponentsPage.table);
    tutorDetailsUpdatePage = await tutorDetailsComponentsPage.goToCreateTutorDetails();
    await tutorDetailsUpdatePage.enterData();

    expect(await tutorDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tutorDetailsComponentsPage.table);
    await waitUntilCount(tutorDetailsComponentsPage.records, beforeRecordsCount + 1);
    expect(await tutorDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tutorDetailsComponentsPage.deleteTutorDetails();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tutorDetailsComponentsPage.records, beforeRecordsCount);
      expect(await tutorDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tutorDetailsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
