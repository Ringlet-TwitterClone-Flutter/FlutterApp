import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Profile from './profile';
import PostDetail from './post-detail';
import PostUpdate from './profile-update';
import PostDeleteDialog from './post-delete-dialog';

const PostRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Profile />} />
    <Route path="new" element={<PostUpdate onNewPost={undefined} />} /> // this is the route for the new post
    <Route path=":id">
      <Route index element={<PostDetail />} />
      <Route path="edit" element={<PostUpdate onNewPost={undefined} />} /> // this is the route for the edit post
      <Route path="delete" element={<PostDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PostRoutes;
