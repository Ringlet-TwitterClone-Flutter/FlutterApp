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
        <span className="butterfree rounded" />
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
            <Alert color="success" id="success">
              Please report any bugs to: The.Flutter.Team@gmail.com
            </Alert>
          </div>
        ) : (
          // This is where we change the sign in display
          <div>
            <Alert color="warning" id="success">
              Already have an account?
              <br />
              <Link to="/login" className="alert-link" id="success-text">
                Sign in
              </Link>
            </Alert>

            <Alert color="warning" id="success">
              New to Flutter?
              <br />
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
