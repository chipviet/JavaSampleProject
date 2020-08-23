import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntity, updateEntity, createEntity, reset } from './feedback.reducer';
import { IFeedback } from 'app/shared/model/feedback.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFeedbackUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FeedbackUpdate = (props: IFeedbackUpdateProps) => {
  const [classIdId, setClassIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { feedbackEntity, courses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/feedback' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...feedbackEntity,
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
          <h2 id="tutorApp.feedback.home.createOrEditLabel">
            <Translate contentKey="tutorApp.feedback.home.createOrEditLabel">Create or edit a Feedback</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : feedbackEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="feedback-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="feedback-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="commentLabel" for="feedback-comment">
                  <Translate contentKey="tutorApp.feedback.comment">Comment</Translate>
                </Label>
                <AvField id="feedback-comment" type="text" name="comment" />
              </AvGroup>
              <AvGroup>
                <Label id="ratingLabel" for="feedback-rating">
                  <Translate contentKey="tutorApp.feedback.rating">Rating</Translate>
                </Label>
                <AvField id="feedback-rating" type="string" className="form-control" name="rating" />
              </AvGroup>
              <AvGroup>
                <Label for="feedback-classId">
                  <Translate contentKey="tutorApp.feedback.classId">Class Id</Translate>
                </Label>
                <AvInput id="feedback-classId" type="select" className="form-control" name="classId.id">
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
              <Button tag={Link} id="cancel-save" to="/feedback" replace color="info">
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
  courses: storeState.course.entities,
  feedbackEntity: storeState.feedback.entity,
  loading: storeState.feedback.loading,
  updating: storeState.feedback.updating,
  updateSuccess: storeState.feedback.updateSuccess,
});

const mapDispatchToProps = {
  getCourses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackUpdate);
