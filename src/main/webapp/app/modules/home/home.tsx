import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2 id="welcome">Welcome to Flutter!</h2>
        <p className="lead" id="motto">
          SPREAD YOUR WINGS
        </p>
        {account?.login ? (
          <div>
            <Alert color="success" id="success">
              You are logged in as user &quot;{account.login}&quot;.
            </Alert>
            <Link to="/post" rel="noopener noreferrer">
              QuottaBoard
            </Link>
            <br></br>
            <Link to="/profile" rel="noopener noreferrer">
              Profile
            </Link>
          </div>
        ) : (
          // This is where we change the sign in display
          <div>
            <Alert color="warning" id="success">
              If you want to
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link" id="success-text">
                sign in
              </Link>
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
              password=&quot;user&quot;).
            </Alert>

            <Alert color="warning" id="success">
              You don&apos;t have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link" id="success-text">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
