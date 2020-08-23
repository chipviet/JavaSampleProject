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
import { getEntity, updateEntity, createEntity, reset } from './salary.reducer';
import { ISalary } from 'app/shared/model/salary.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalaryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalaryUpdate = (props: ISalaryUpdateProps) => {
  const [levelIdId, setLevelIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salaryEntity, courses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/salary');
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
        ...salaryEntity,
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
          <h2 id="tutorApp.salary.home.createOrEditLabel">
            <Translate contentKey="tutorApp.salary.home.createOrEditLabel">Create or edit a Salary</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salaryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="salary-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="salary-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="leverLabel" for="salary-lever">
                  <Translate contentKey="tutorApp.salary.lever">Lever</Translate>
                </Label>
                <AvField id="salary-lever" type="string" className="form-control" name="lever" />
              </AvGroup>
              <AvGroup>
                <Label id="conefficientLabel" for="salary-conefficient">
                  <Translate contentKey="tutorApp.salary.conefficient">Conefficient</Translate>
                </Label>
                <AvField id="salary-conefficient" type="string" className="form-control" name="conefficient" />
              </AvGroup>
              <AvGroup>
                <Label for="salary-levelId">
                  <Translate contentKey="tutorApp.salary.levelId">Level Id</Translate>
                </Label>
                <AvInput id="salary-levelId" type="select" className="form-control" name="levelId.id">
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
              <Button tag={Link} id="cancel-save" to="/salary" replace color="info">
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
  salaryEntity: storeState.salary.entity,
  loading: storeState.salary.loading,
  updating: storeState.salary.updating,
  updateSuccess: storeState.salary.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(SalaryUpdate);
