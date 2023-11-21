import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL PRODUCTS
        </NavLink>
      </li>
      <li>
        <NavLink to="/product" exact>
          ADD PRODUCT
        </NavLink>
      </li>
      <li>
        <NavLink to="/categories" exact>
          ALL CATEGORIES
        </NavLink>
      </li>
      <li>
        <NavLink to="/category" exact>
          ADD CATEGORY
        </NavLink>
      </li>
      <li>
        <NavLink to="/po" exact>
          <i className="fas fa-shopping-cart"></i>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
