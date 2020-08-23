import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './salary.reducer';
import { ISalary } from 'app/shared/model/salary.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalaryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Salary = (props: ISalaryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { salaryList, match, loading } = props;
  return (
    <div>
      <h2 id="salary-heading">
        <Translate contentKey="tutorApp.salary.home.title">Salaries</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tutorApp.salary.home.createLabel">Create new Salary</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {salaryList && salaryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.salary.lever">Lever</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.salary.conefficient">Conefficient</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.salary.levelId">Level Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {salaryList.map((salary, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${salary.id}`} color="link" size="sm">
                      {salary.id}
                    </Button>
                  </td>
                  <td>{salary.lever}</td>
                  <td>{salary.conefficient}</td>
                  <td>{salary.levelId ? <Link to={`course/${salary.levelId.id}`}>{salary.levelId.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${salary.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${salary.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${salary.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutorApp.salary.home.notFound">No Salaries found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ salary }: IRootState) => ({
  salaryList: salary.entities,
  loading: salary.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Salary);
