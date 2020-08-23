import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScheduleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Schedule = (props: IScheduleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { scheduleList, match, loading } = props;
  return (
    <div>
      <h2 id="schedule-heading">
        <Translate contentKey="tutorApp.schedule.home.title">Schedules</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tutorApp.schedule.home.createLabel">Create new Schedule</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {scheduleList && scheduleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.schedule.weekDay">Week Day</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.schedule.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.schedule.tutorDetails">Tutor Details</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.schedule.course">Course</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((schedule, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${schedule.id}`} color="link" size="sm">
                      {schedule.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`tutorApp.WeekDay.${schedule.weekDay}`} />
                  </td>
                  <td>{schedule.start}</td>
                  <td>
                    {schedule.tutorDetails ? <Link to={`tutor-details/${schedule.tutorDetails.id}`}>{schedule.tutorDetails.id}</Link> : ''}
                  </td>
                  <td>{schedule.course ? <Link to={`course/${schedule.course.id}`}>{schedule.course.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${schedule.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${schedule.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${schedule.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="tutorApp.schedule.home.notFound">No Schedules found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ schedule }: IRootState) => ({
  scheduleList: schedule.entities,
  loading: schedule.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
