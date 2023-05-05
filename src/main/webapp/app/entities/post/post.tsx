import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities } from './post.reducer';

export const Post = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

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
      <h1 id="post-heading" data-cy="PostHeading">
        Posts
        <div className="d-flex justify-content-center">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading} id="refresh-list">
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Post
          </Link>
        </div>
      </h1>

      {
        <div className="container">
          {postList && postList.length > 0 ? (
            <div className="post-list">
              {postList.map((post, i) => (
                <div key={`entity-${i}`} className="post-list-row" data-cy="entityTable">
                  <div className="card">
                    <div className="post-list-cell post-header" id="post-header">
                      <h3>{post.user ? post.user.login : ''}</h3>
                      <span className="post-time">
                        {post.createdAt ? <TextFormat type="date" value={post.createdAt} format={APP_DATE_FORMAT} /> : null}
                      </span>
                    </div>

                    <div className="post-list-cell post-content" id="post-content">
                      <p>{post.text}</p>
                    </div>
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
                    <div className="post-list-cell">
                      <div className="btn-group flex-btn-group-container" id="buttons">
                        <Button tag={Link} to={`/comment/new`} id="comment-button" size="sm" data-cy="entityDeleteButton">
                          <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Comment</span>
                        </Button>
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
};

export default Post;

/* <div className="table-responsive">
        {postList && postList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Created At</th>
                <th>User</th>
                <th>Hashtags</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {postList.map((post, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/post/${post.id}`} color="link" size="sm">
                      {post.id}
                    </Button>
                  </td>
                  <td>{post.text}</td>
                  <td>{post.createdAt ? <TextFormat type="date" value={post.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{post.user ? post.user.login : ''}</td>
                  <td>
                    {post.hashtags
                      ? post.hashtags.map((val, j) => (
                          <span key={j}>
                            <Link to={`/hashtag/${val.id}`}>{val.name}</Link>
                            {j === post.hashtags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/post/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton" id="view-button">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/post/${post.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/post/${post.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Posts found</div>
        )}
      </div> */
