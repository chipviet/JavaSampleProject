import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITutorDetails } from 'app/shared/model/tutor-details.model';
import { getEntities as getTutorDetails } from 'app/entities/tutor-details/tutor-details.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ScheduleUpdate = (props: IScheduleUpdateProps) => {
  const [tutorDetailsId, setTutorDetailsId] = useState('0');
  const [courseId, setCourseId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { scheduleEntity, tutorDetails, courses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/schedule');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTutorDetails();
    props.getCourses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...scheduleEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tutorApp.schedule.home.createOrEditLabel">
            <Translate contentKey="tutorApp.schedule.home.createOrEditLabel">Create or edit a Schedule</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : scheduleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="schedule-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="schedule-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="weekDayLabel" for="schedule-weekDay">
                  <Translate contentKey="tutorApp.schedule.weekDay">Week Day</Translate>
                </Label>
                <AvInput
                  id="schedule-weekDay"
                  type="select"
                  className="form-control"
                  name="weekDay"
                  value={(!isNew && scheduleEntity.weekDay) || 'Sunday'}
                >
                  <option value="Sunday">{translate('tutorApp.WeekDay.Sunday')}</option>
                  <option value="Monday">{translate('tutorApp.WeekDay.Monday')}</option>
                  <option value="Tuesday">{translate('tutorApp.WeekDay.Tuesday')}</option>
                  <option value="Wednesday">{translate('tutorApp.WeekDay.Wednesday')}</option>
                  <option value="Thursday">{translate('tutorApp.WeekDay.Thursday')}</option>
                  <option value="Friday">{translate('tutorApp.WeekDay.Friday')}</option>
                  <option value="Saturday">{translate('tutorApp.WeekDay.Saturday')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="startLabel" for="schedule-start">
                  <Translate contentKey="tutorApp.schedule.start">Start</Translate>
                </Label>
                <AvField id="schedule-start" type="string" className="form-control" name="start" />
              </AvGroup>
              <AvGroup>
                <Label for="schedule-tutorDetails">
                  <Translate contentKey="tutorApp.schedule.tutorDetails">Tutor Details</Translate>
                </Label>
                <AvInput id="schedule-tutorDetails" type="select" className="form-control" name="tutorDetails.id">
                  <option value="" key="0" />
                  {tutorDetails
                    ? tutorDetails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="schedule-course">
                  <Translate contentKey="tutorApp.schedule.course">Course</Translate>
                </Label>
                <AvInput id="schedule-course" type="select" className="form-control" name="course.id">
                  <option value="" key="0" />
                  {courses
                    ? courses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/schedule" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tutorDetails: storeState.tutorDetails.entities,
  courses: storeState.course.entities,
  scheduleEntity: storeState.schedule.entity,
  loading: storeState.schedule.loading,
  updating: storeState.schedule.updating,
  updateSuccess: storeState.schedule.updateSuccess,
});

const mapDispatchToProps = {
  getTutorDetails,
  getCourses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleUpdate);
