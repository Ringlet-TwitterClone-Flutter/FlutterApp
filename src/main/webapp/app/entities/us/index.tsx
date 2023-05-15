import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

const UsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route path=":id"></Route>
  </ErrorBoundaryRoutes>
);

export default UsRoutes;
