import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './feedback.reducer';
import { IFeedback } from 'app/shared/model/feedback.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFeedbackDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FeedbackDetail = (props: IFeedbackDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { feedbackEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tutorApp.feedback.detail.title">Feedback</Translate> [<b>{feedbackEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="comment">
              <Translate contentKey="tutorApp.feedback.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{feedbackEntity.comment}</dd>
          <dt>
            <span id="rating">
              <Translate contentKey="tutorApp.feedback.rating">Rating</Translate>
            </span>
          </dt>
          <dd>{feedbackEntity.rating}</dd>
          <dt>
            <Translate contentKey="tutorApp.feedback.classId">Class Id</Translate>
          </dt>
          <dd>{feedbackEntity.classId ? feedbackEntity.classId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/feedback" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/feedback/${feedbackEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ feedback }: IRootState) => ({
  feedbackEntity: feedback.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDetail);
