import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tutor-details.reducer';
import { ITutorDetails } from 'app/shared/model/tutor-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITutorDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TutorDetails = (props: ITutorDetailsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tutorDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="tutor-details-heading">
        <Translate contentKey="tutorApp.tutorDetails.home.title">Tutor Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tutorApp.tutorDetails.home.createLabel">Create new Tutor Details</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tutorDetailsList && tutorDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.tutorDetails.literacy">Literacy</Translate>
                </th>
                <th>
                  <Translate contentKey="tutorApp.tutorDetails.efficency">Efficency</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tutorDetailsList.map((tutorDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tutorDetails.id}`} color="link" size="sm">
                      {tutorDetails.id}
                    </Button>
                  </td>
                  <td>{tutorDetails.literacy}</td>
                  <td>{tutorDetails.efficency}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tutorDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tutorDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tutorDetails.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutorApp.tutorDetails.home.notFound">No Tutor Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tutorDetails }: IRootState) => ({
  tutorDetailsList: tutorDetails.entities,
  loading: tutorDetails.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetails);
