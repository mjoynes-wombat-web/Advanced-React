import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Nav = props => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
  </div>
);

Nav.propTypes = {

};

export default Nav;
