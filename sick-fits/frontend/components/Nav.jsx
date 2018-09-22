import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Nav = props => (
  <div>
    <Link href="/">Home</Link>
    <Link href="/sell">Sell</Link>
  </div>
);

Nav.propTypes = {

};

export default Nav;
