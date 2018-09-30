import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
  onToken = async ({ id }, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: id,
      },
    }).catch(err => window.alert(err.message));

    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  }

  render() {
    const { children } = this.props;
    return (
      <User>
        {({ data: { me } }) => {
          if (!me.cart.length) return null;
          const cartCount = totalItems(me.cart);
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[
                { query: CURRENT_USER_QUERY },
              ]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name="Sick Fits"
                  description={`Order of ${cartCount} item${cartCount > 1 ? 's' : ''}.`}
                  image={me.cart[0].item && me.cart[0].item.image}
                  stripeKey="pk_test_3FpgXwxA1d8Z9PTwOgWaACaU"
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

TakeMyMoney.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TakeMyMoney;
