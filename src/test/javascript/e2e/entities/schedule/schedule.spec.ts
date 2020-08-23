import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ScheduleComponentsPage from './schedule.page-object';
import ScheduleUpdatePage from './schedule-update.page-object';
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

describe('Schedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scheduleComponentsPage: ScheduleComponentsPage;
  let scheduleUpdatePage: ScheduleUpdatePage;

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
    scheduleComponentsPage = new ScheduleComponentsPage();
    scheduleComponentsPage = await scheduleComponentsPage.goToPage(navBarPage);
  });

  it('should load Schedules', async () => {
    expect(await scheduleComponentsPage.title.getText()).to.match(/Schedules/);
    expect(await scheduleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Schedules', async () => {
    const beforeRecordsCount = (await isVisible(scheduleComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(scheduleComponentsPage.table);
    scheduleUpdatePage = await scheduleComponentsPage.goToCreateSchedule();
    await scheduleUpdatePage.enterData();

    expect(await scheduleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(scheduleComponentsPage.table);
    await waitUntilCount(scheduleComponentsPage.records, beforeRecordsCount + 1);
    expect(await scheduleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await scheduleComponentsPage.deleteSchedule();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(scheduleComponentsPage.records, beforeRecordsCount);
      expect(await scheduleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(scheduleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
