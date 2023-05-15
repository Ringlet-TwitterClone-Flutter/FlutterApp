Anastasian
#6777

JamesJang-2jz — 03/20/2023 10:58 AM
add me
JamesJang-2jz — 03/23/2023 9:50 PM
have you pushed blackjack?
do u need help on anything?
Anastasian — 03/23/2023 9:52 PM
i didn't push it yet, im still working on it, i fine for now i think, just trying to figure out how to put everything together
JamesJang-2jz — 03/23/2023 9:53 PM
nice! ok
Anastasian — 03/23/2023 10:15 PM
Quick question, we only have one player playing the game or we have to make it for more than one player?
JamesJang-2jz — 03/23/2023 10:56 PM
One player and one computer
Anastasian — 03/23/2023 10:56 PM
okie
Anastasian — 03/24/2023 11:14 AM
past: blackJack game Present: fixing the output Blockers: errors between classes. working on correct output
JamesJang-2jz — 05/13/2023 5:21 PM
jdbc:h2:file:./target/h2db/db/flutterapp;DB_CLOSE_DELAY=-1;MODE=LEGACY
jdbc:postgresql://localhost:5432/FlutterApp
Anastasian — 05/13/2023 6:49 PM
Ссаная
JamesJang-2jz — 05/13/2023 8:01 PM
Did u take another laptop case by mistake maybe?
JamesJang-2jz — Yesterday at 5:29 PM
Image
Anastasian — Yesterday at 5:39 PM
😖😖
Image
JamesJang-2jz — Yesterday at 5:40 PM
Omg nooo
Drive safe
Anastasian — Yesterday at 5:40 PM
Thank you
JamesJang-2jz — Today at 2:55 PM
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Expand
message.txt
6 KB
﻿
JamesJang-2jz#5294
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
        Profile
      </h1>
      <div className="card">
        <div className="profile-info">
          <div id="user">User: {currentUser.login}</div>
          <div>Name: {currentUser.firstName}</div>s<div>Bio: {currentUser.lastName}</div>
          <div>ID: {currentUser.id}</div>
          <div>Profile Pic: {currentUser.imageUrl}</div>
          {/* Edit Button */}
          <Button tag={Link} to={`./profile-update`} color="primary" size="sm" data-cy="entityEditButton" id="view-button">
            <FontAwesomeIcon icon="user-edit" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
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
};

export default Profile;
message.txt
6 KB