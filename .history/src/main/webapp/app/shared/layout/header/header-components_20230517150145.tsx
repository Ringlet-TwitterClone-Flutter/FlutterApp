import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img id="butterfly" height="30" width="50" src="content/images/Butterfree-Pokemon-PNG-Transparent.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">&nbsp;Flutter</span>
    {/* <span className="navbar-version">{VERSION}</span> */}
    <span className="navbar-version">Spread your wings</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" id="profile-span" />
      <span id="profile-span" style={{ marginLeft: '0.3rem' }}>
        Home
      </span>
    </NavLink>
  </NavItem>
);

export const Feed = () => (
  <NavItem>
    <NavLink tag={Link} to="/post" className="d-flex align-items-center">
      <FontAwesomeIcon icon="newspaper" id="profile-span" />
      <span id="profile-span" style={{ marginLeft: '0.3rem' }}>
        Feed
      </span>
    </NavLink>
  </NavItem>
);

export const Profile = () => (
  <NavItem>
    <NavLink tag={Link} to="/profile" className="d-flex align-items-center">
      <FontAwesomeIcon icon="user-circle" id="profile-span" />
      <span id="profile-span" style={{ marginLeft: '0.3rem' }}>
        Profile
      </span>
    </NavLink>
  </NavItem>
);
export const Us = () => (
  <NavItem>
    <NavLink tag={Link} to="/us" className="d-flex align-items-center">
      <FontAwesomeIcon icon="briefcase" id="us-span" />
      <span id="us-span" style={{ marginLeft: '0.3rem' }}>
        About Us
      </span>
    </NavLink>
  </NavItem>
);
