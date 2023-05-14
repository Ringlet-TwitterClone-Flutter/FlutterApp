import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities } from './profile.reducer';
import { find } from 'lodash';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.authentication.account);
  const profile = useAppSelector(state => state.authentication.account);
  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      {/* Heading */}
      <h1 id="profile-heading" data-cy="ProfileHeading">
        Profile jopa ssanaya
        
        <p>{currentUser.login}</p>
      </h1>

      <div className="container">
        <div className="profile-info">
          <p> {profile.firstName}</p>

          {/* Edit Button */}
          <Button tag={Link} to={`/user/${profile.login}/edit`} color="primary" size="sm" data-cy="entityEditButton" id="view-button">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>

          <p> {profile.lastName}</p>

          <p> {profile.email}</p>
        </div>
      </div>

      {/* Heading */}
      <h1 id="post-heading" data-cy="PostHeading">
        Posts
        {/* Buttons */}
        <div className="d-flex justify-content-center">
          {/* Refresh List Button */}
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading} id="refresh-list">
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>

          {/* Create New Post Button */}
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Post
          </Link>
        </div>
      </h1>

      {/* Displays each Post */}
      {
        <div className="container">
          {postList && postList.length > 0 ? (
            <div className="post-list">
              {/* Displays each Post */}
              {postList.map((post, i) => (
                <div key={`entity-${i}`} className="post-list-row" data-cy="entityTable">
                  <div className="card">
                    {/* Username and Post Time */}
                    <div className="post-list-cell post-header" id="post-header">
                      <h3>{post.user ? post.user.login : ''}</h3>
                      <span className="post-time">
                        {post.createdAt ? <TextFormat type="date" value={post.createdAt} format={APP_DATE_FORMAT} /> : null}
                      </span>
                    </div>

                    {/* Content of post */}
                    <div className="post-list-cell post-content" id="post-content">
                      <p>{post.text}</p>
                    </div>

                    {/* Hashtags */}
                    <div className="post-list-cell">
                      {post.hashtags
                        ? post.hashtags.map((val, j) => (
                            <span key={j}>
                              <Link to={`/hashtag/${val.id}`}>{val.name}</Link>
                              {j === post.hashtags.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </div>

                    {/* Buttons */}
                    <div className="post-list-cell">
                      <div className="btn-group flex-btn-group-container" id="buttons">
                        {/* Comment Button */}
                        <Button tag={Link} to={`/comment/new`} id="comment-button" size="sm" data-cy="entityDeleteButton">
                          <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Comment</span>
                        </Button>

                        {/* Edit Button */}
                        <Button
                          tag={Link}
                          to={`/post/${post.id}/edit`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                          id="view-button"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>

                        {/* Delete Button */}
                        <Button
                          tag={Link}
                          to={`/post/${post.id}/delete`}
                          color="primary"
                          id="delete-button"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && <div className="alert alert-warning">No Posts found</div>
          )}
        </div>
      }
    </div>
  );
}

export default Profile;
