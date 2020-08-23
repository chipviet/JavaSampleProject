import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Salary from './salary';
import SalaryDetail from './salary-detail';
import SalaryUpdate from './salary-update';
import SalaryDeleteDialog from './salary-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalaryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalaryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalaryDetail} />
      <ErrorBoundaryRoute path={match.url} component={Salary} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SalaryDeleteDialog} />
  </>
);

export default Routes;
