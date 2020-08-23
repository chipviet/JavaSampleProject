import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tutor-details.reducer';
import { ITutorDetails } from 'app/shared/model/tutor-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITutorDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TutorDetailsDetail = (props: ITutorDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tutorDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tutorApp.tutorDetails.detail.title">TutorDetails</Translate> [<b>{tutorDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="literacy">
              <Translate contentKey="tutorApp.tutorDetails.literacy">Literacy</Translate>
            </span>
          </dt>
          <dd>{tutorDetailsEntity.literacy}</dd>
          <dt>
            <span id="efficency">
              <Translate contentKey="tutorApp.tutorDetails.efficency">Efficency</Translate>
            </span>
          </dt>
          <dd>{tutorDetailsEntity.efficency}</dd>
        </dl>
        <Button tag={Link} to="/tutor-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tutor-details/${tutorDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tutorDetails }: IRootState) => ({
  tutorDetailsEntity: tutorDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetailsDetail);
