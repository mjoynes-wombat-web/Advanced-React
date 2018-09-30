import React from 'react';
import PropTypes from 'prop-types';

import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

OrdersPage.propTypes = {

};

export default OrdersPage;
