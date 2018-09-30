import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data;
      const { cartOpen } = localState.data;
      if (!me) return null;
      const count = me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
      return (
        <CartStyles open={cartOpen}>
          <header>
            <CloseButton title="close" onClick={toggleCart}>
          &times;
            </CloseButton>
            <Supreme>{me.name}'s Cart</Supreme>
            <p>You Have {count} Item{count === 1 ? '' : 's'} in Your Cart</p>
          </header>
          <ul>
            {me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

Cart.propTypes = {

};

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
export default Cart;
