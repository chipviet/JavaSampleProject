import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './salary.reducer';
import { ISalary } from 'app/shared/model/salary.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalaryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalaryDetail = (props: ISalaryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salaryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tutorApp.salary.detail.title">Salary</Translate> [<b>{salaryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="lever">
              <Translate contentKey="tutorApp.salary.lever">Lever</Translate>
            </span>
          </dt>
          <dd>{salaryEntity.lever}</dd>
          <dt>
            <span id="conefficient">
              <Translate contentKey="tutorApp.salary.conefficient">Conefficient</Translate>
            </span>
          </dt>
          <dd>{salaryEntity.conefficient}</dd>
          <dt>
            <Translate contentKey="tutorApp.salary.levelId">Level Id</Translate>
          </dt>
          <dd>{salaryEntity.levelId ? salaryEntity.levelId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/salary" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/salary/${salaryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ salary }: IRootState) => ({
  salaryEntity: salary.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalaryDetail);
