import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SalaryComponentsPage from './salary.page-object';
import SalaryUpdatePage from './salary-update.page-object';
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

describe('Salary e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salaryComponentsPage: SalaryComponentsPage;
  let salaryUpdatePage: SalaryUpdatePage;

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
    salaryComponentsPage = new SalaryComponentsPage();
    salaryComponentsPage = await salaryComponentsPage.goToPage(navBarPage);
  });

  it('should load Salaries', async () => {
    expect(await salaryComponentsPage.title.getText()).to.match(/Salaries/);
    expect(await salaryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Salaries', async () => {
    const beforeRecordsCount = (await isVisible(salaryComponentsPage.noRecords)) ? 0 : await getRecordsCount(salaryComponentsPage.table);
    salaryUpdatePage = await salaryComponentsPage.goToCreateSalary();
    await salaryUpdatePage.enterData();

    expect(await salaryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(salaryComponentsPage.table);
    await waitUntilCount(salaryComponentsPage.records, beforeRecordsCount + 1);
    expect(await salaryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await salaryComponentsPage.deleteSalary();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(salaryComponentsPage.records, beforeRecordsCount);
      expect(await salaryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(salaryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
