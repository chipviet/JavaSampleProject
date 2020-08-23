import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TutorDetails from './tutor-details';
import TutorDetailsDetail from './tutor-details-detail';
import TutorDetailsUpdate from './tutor-details-update';
import TutorDetailsDeleteDialog from './tutor-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TutorDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TutorDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TutorDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={TutorDetails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TutorDetailsDeleteDialog} />
  </>
);

export default Routes;
