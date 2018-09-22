import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Home = props => (
  <>
    <p>Hey</p>
    <Link href="/sell">Sell</Link>
  </>
);

Home.propTypes = {

};

export default Home;
