import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Post from './us';
import PostDetail from './us-detail';
import PostUpdate from './us-update';
import PostDeleteDialog from './us-delete-dialog';

const PostRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Post />} />
    <Route path="new" element={<PostUpdate />} />
    <Route path=":id">
      <Route index element={<PostDetail />} />
      <Route path="edit" element={<PostUpdate />} />
      <Route path="delete" element={<PostDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PostRoutes;
