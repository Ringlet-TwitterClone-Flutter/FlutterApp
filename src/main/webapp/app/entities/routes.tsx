import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Post from './post';
import Profile from './profile';
import Hashtag from './hashtag';
import Comment from './comment';
import Us from './us';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="post/*" element={<Post />} /> // This is where we add the route to the post page
        <Route path="profile/*" element={<Profile />} />
        <Route path="hashtag/*" element={<Hashtag />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="us/*" element={<Us />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
