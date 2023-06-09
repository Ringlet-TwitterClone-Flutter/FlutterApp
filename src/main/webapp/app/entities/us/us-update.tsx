import React, { useState, useEffect, forwardRef, ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IHashtag } from 'app/shared/model/hashtag.model';
import { getEntities as getHashtags } from 'app/entities/hashtag/hashtag.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntity, updateEntity, createEntity, reset, getEntities } from './us.reducer';

export const PostUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  let { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [refresh, setRefresh] = useState(false);
  const [latestId, setLatestId] = useState(0);
  const currentUser = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const hashtags = useAppSelector(state => state.hashtag.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);

  /** this is called after updateSuccess in useEffect. so it
   * redirects to the /post page but we don't need this part anymore */
  const handleClose = () => {
    navigate('/post');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getHashtags({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
      setRefresh(true);
    }
  }, [updateSuccess]);

  // useEffect(() => {
  //   if (refresh) {
  //     window.location.reload();
  //   }
  // }, [refresh]);

  const saveEntity = values => {
    // gets current date and time
    const currentDate = new Date();
    // convert currentDate to server format
    values.createdAt = convertDateTimeToServer(currentDate);

    const entity = {
      ...postEntity,
      ...values,
      hashtags: mapIdList(values.hashtags),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
    setRefresh(true);
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: displayDefaultDateTime(),
        }
      : {
          ...postEntity,
          createdAt: convertDateTimeFromServer(postEntity.createdAt),
          user: postEntity?.user?.id,
          hashtags: postEntity?.hashtags?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="11">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="post-id" label="" validate={{ required: true }} /> : null}
              <ValidatedField
                label="New Post"
                id="post-text"
                name="text"
                data-cy="text"
                type="textarea"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
                style={{}}
              />
              {/* <ValidatedField
                label="Created At"
                id="post-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
                style={{ width: '50%' }}
              /> */}
              <ValidatedField id="post-user" name="user" data-cy="user" type="select">
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.login}
                </option>
              </ValidatedField>
              <ValidatedField label="" id="post-hashtag" data-cy="hashtags" type="select" multiple name="hashtags">
                <option value="" key="0" />
                {hashtags
                  ? hashtags.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              &nbsp;
              <Button color="primary" id="comment-button" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="plus" />
                &nbsp; Post
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PostUpdate;
