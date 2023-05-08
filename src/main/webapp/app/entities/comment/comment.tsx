import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IComment } from 'app/shared/model/comment.model';
import { getEntities } from './comment.reducer';

export const Comment = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const commentList = useAppSelector(state => state.comment.entities);
  const loading = useAppSelector(state => state.comment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="comment-heading" data-cy="CommentHeading">
        Comments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading} id="refresh-list">
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/comment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Comment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {commentList && commentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Created At</th>
                <th>User</th>
                <th>Post</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentList.map((comment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/comment/${comment.id}`} color="link" size="sm">
                      {comment.id}
                    </Button>
                  </td>
                  <td>{comment.text}</td>
                  <td>{comment.createdAt ? <TextFormat type="date" value={comment.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{comment.user ? comment.user.login : ''}</td>
                  <td>{comment.post ? <Link to={`/post/${comment.post.id}`}>{comment.post.text}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/comment/${comment.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                        id="view-button"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/comment/${comment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/comment/${comment.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Comments found</div>
        )}
      </div>
    </div>
  );
};

export default Comment;
// <div>
//   <h2 id="comment-heading" data-cy="CommentHeading">
//   Comments
//   <div className="d-flex justify-content-end">
//     <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading} id="refresh-list">
//       <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
//     </Button>
//     <Link to="/comment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
//       <FontAwesomeIcon icon="plus" />
//       &nbsp; Create a new Comment
//     </Link>
//   </div>
// </h2>
// {commentList && commentList.length > 0 ? (
//   <div className="comment-container">
//     {commentList.map((comment, i) => (
//       <div key={`entity-${i}`} data-cy="entityTable" className="comment">
//         <div className="comment-field">
//           <div className="comment-label">ID</div>
//           <div className="comment-value">
//             <Button tag={Link} to={`/comment/${comment.id}`} color="link" size="sm">
//               {comment.id}
//             </Button>
//           </div>
//         </div>
//         <div className="comment-field">
//           <div className="comment-label">Text</div>
//           <div className="comment-value">{comment.text}</div>
//         </div>
//         <div className="comment-field">
//           <div className="comment-label">Created At</div>
//           <div className="comment-value">{comment.createdAt ? <TextFormat type="date" value={comment.createdAt} format={APP_DATE_FORMAT} /> : null}</div>
//         </div>
//         <div className="comment-field">
//           <div className="comment-label">User</div>
//           <div className="comment-value">{comment.user ? comment.user.login : ''}</div>
//         </div>
//         <div className="comment-field">
//           <div className="comment-label">Post</div>
//           <div className="comment-value">{comment.post ? <Link to={`/post/${comment.post.id}`}>{comment.post.text}</Link> : ''}</div>
//         </div>
//         <div className="comment-field">
//           <div className="comment-label"></div>
//           <div className="comment-value text-end">
//             <div className="btn-group flex-btn-group-container">
//               <Button
//                 tag={Link}
//                 to={`/comment/${comment.id}`}
//                 color="info"
//                 size="sm"
//                 data-cy="entityDetailsButton"
//                 id="view-button"
//               >
//                 <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
//               </Button>
//               <Button tag={Link} to={`/comment/${comment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
//                 <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
//               </Button>
//               <Button tag={Link} to={`/comment/${comment.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
//                 <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   !loading && <div className="alert alert-warning">No Comments found</div>
// )}
// </div>
