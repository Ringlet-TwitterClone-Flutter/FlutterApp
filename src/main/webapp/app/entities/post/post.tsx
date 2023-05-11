import React, { useState, useEffect, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities } from './post.reducer';
import FlipMove from 'react-flip-move';
import PostUpdate from './post-update';

export const Post = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const commentList = useAppSelector(state => state.comment.entities);

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const currentUser = useAppSelector(state => state.authentication.account);
  const postEntity = useAppSelector(state => state.post.entity);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <Row>
      <Col md="2" className="" style={{ display: 'flex', justifyContent: 'right' }}>
        <div className="wrapper sidebar">
          <ul>
            <FontAwesomeIcon icon="home" />
            <Link id="home-button" to="/home" rel="noopener noreferrer">
              {' '}
              Home
            </Link>
            <br></br>
            <img height="23" width="23" src="content/images/butterflySilho.png" alt="Logo" />
            <Link id="profile-button" to="/profile" rel="noopener noreferrer">
              {' '}
              Profile
            </Link>
          </ul>
        </div>
      </Col>
      <Col md="8">
        <div>
          {/* Heading */}
          <h1 id="post-heading" data-cy="PostHeading">
            <div id="header-jawn">
              <img height="25" width="25" src="content/images/butterflySilho.png" alt="Logo" />
              Flutter Feed
              <img height="25" width="25" src="content/images/butterflySilhoFlipped.png" alt="Logo" />
            </div>
            <div className="d-flex justify-content-center">
              {/* Create New Post Button */}
              <div className="container">
                <div className="post-list-row">
                  <div className="card">
                    <PostUpdate></PostUpdate>
                    {/* <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                      <FontAwesomeIcon icon="plus" />
                      &nbsp;New Post
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </h1>

          {
            <div className="container">
              {postList && postList.length > 0 ? (
                <div className="post-list">
                  <FlipMove>
                    {/* Displays each Post */}
                    {[...postList].reverse().map((post, i) => (
                      <div key={`entity-${i}`} className="post-list-row" data-cy="entityTable">
                        <div className="card">
                          {/* Username and Post Time */}
                          <div className="post-list-cell post-header" id="post-header">
                            <h4>{post.user ? post.user.login : ''}</h4>
                            <span className="post-time">
                              {post.createdAt ? <TextFormat type="date" value={post.createdAt} format={APP_DATE_FORMAT} /> : null}
                            </span>
                          </div>

                          {/* Content of post */}
                          <div className="post-list-cell post-content" id="post-content">
                            <p>{post.text}</p>
                          </div>

                          {/* Hashtags */}
                          <div className="post-list-cell " id="post-hashtag">
                            {postEntity.hashtags
                              ? postEntity.hashtags.map((val, j) => (
                                  <span key={j}>
                                    <Link to={`/hashtag/${val.id}`}>{val.name}</Link>
                                    {j === postEntity.hashtags.length - 1 ? '' : ', '}
                                  </span>
                                ))
                              : '#Flutter'}

                            {/* Comment Button */}
                            <Button tag={Link} to={`/comment/new`} id="comment-button" size="sm" data-cy="entityDeleteButton">
                              <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Comment</span>
                            </Button>
                            {/* Edit Button */}
                            {post.user &&
                              post.user.login === currentUser.login && ( // Check if post belongs to the current user
                                <Button
                                  tag={Link}
                                  to={`/post/${post.id}/edit`}
                                  color="primary"
                                  size="sm"
                                  data-cy="entityEditButton"
                                  id="edit-button"
                                >
                                  <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                                </Button>
                              )}
                            {/* Delete Button */}
                            {post.user &&
                              post.user.login === currentUser.login && ( // Check if post belongs to the current user
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
                              )}
                          </div>
                        </div>
                        {/* ADD COMMENTS TO POSTS HERE */}
                        <div className="comment-container">
                          <div>
                            {commentList && commentList.length > 0 ? (
                              <div className="card">
                                {commentList
                                  .filter(comment => comment.post && comment.post.id === post.id)
                                  .map((comment, i) => (
                                    <div key={`entity-${i}`} data-cy="entityTable" className="comment">
                                      <div className="comment-field">
                                        <div className="comment-value">{comment.text}</div>
                                      </div>
                                      <div className="comment-field">
                                        <div className="comment-value">
                                          {comment.createdAt ? (
                                            <TextFormat type="date" value={comment.createdAt} format={APP_DATE_FORMAT} />
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="comment-field">
                                        <div className="comment-value">{comment.user ? comment.user.login : ''}</div>
                                      </div>
                                      <div className="comment-field">
                                        <div className="comment-label"></div>
                                        <div className="comment-value text-end">
                                          <div className="btn-group flex-btn-group-container">
                                            <Button
                                              tag={Link}
                                              to={`/comment/${comment.id}/edit`}
                                              size="sm"
                                              data-cy="entityEditButton"
                                              id="edit-button"
                                            >
                                              <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                                            </Button>
                                            <Button
                                              tag={Link}
                                              to={`/comment/${comment.id}/delete`}
                                              color="black"
                                              size="sm"
                                              data-cy="entityDeleteButton"
                                              id="delete-button"
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
                              !loading && (
                                <div id="success" className="alert alert-warning">
                                  No Comments found
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </FlipMove>
                </div>
              ) : (
                !loading && <div className="alert alert-warning">No Posts found</div>
              )}
            </div>
          }
        </div>
      </Col>
      <Col md="2">
        //temporary until we make another sidebar here
        {/* Shows specific hashtag under every post, temporarily */}
        <div className="sidebar">
          {/* <ul>
            <FontAwesomeIcon icon="home" />
            <Link id="home-button" to="/home" rel="noopener noreferrer">
              {' '}
              Home
            </Link>
            <br></br>
            <img height="23" width="23" src="content/images/butterflySilho.png" alt="Logo" />
            <Link id="profile-button" to="/profile" rel="noopener noreferrer">
              {' '}
              Profile
            </Link>
          </ul> */}
        </div>
      </Col>
    </Row>
  );
};

export default Post;
{
  /* <ValidatedField
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
              /> */
}
