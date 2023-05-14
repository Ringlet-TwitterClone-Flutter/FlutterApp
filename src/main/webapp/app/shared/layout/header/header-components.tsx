import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/butterflySilho.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">Flutter</span>
    {/* <span className="navbar-version">{VERSION}</span> */}
    <span className="navbar-version">Spread your wings</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);

export const Feed = () => (
  <NavItem>
    <NavLink tag={Link} to="/post" className="d-flex align-items-center">
      <FontAwesomeIcon icon="pencil" />
      <span>Feed</span>
    </NavLink>
  </NavItem>
);

export const Profile = () => (
  <NavItem>
    <NavLink tag={Link} to="/profile" className="d-flex align-items-center">
      <FontAwesomeIcon icon="pencil" />
      <span>Profile</span>
    </NavLink>
  </NavItem>
);
