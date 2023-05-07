import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './hashtag.reducer';

export const HashtagDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const hashtagEntity = useAppSelector(state => state.hashtag.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="hashtagDetailsHeading">Hashtag</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{hashtagEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{hashtagEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/hashtag" replace color="info" data-cy="entityDetailsBackButton" id="view-button">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/hashtag/${hashtagEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default HashtagDetail;
