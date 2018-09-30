import React from 'react';
import PropTypes from 'prop-types';

import PleaseSignIn from '../components/PleaseSignIn';
import Order from '../components/Order';

const OrderPage = ({ query: { id } }) => (
  <div>
    <PleaseSignIn>
      <Order id={id} />
    </PleaseSignIn>
  </div>
);

OrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default OrderPage;
