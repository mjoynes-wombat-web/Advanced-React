import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{
      id,
    }}
    refetchQueries={[
      { query: CURRENT_USER_QUERY },
    ]}
  >
    {(addToCart, { error, loading }) => (
      <button type="button" onClick={addToCart} disabled={loading}>Add{loading && 'ing'} To Cart <span role="img" aria-label="Shopping Cart">🛒</span></button>
    )}
  </Mutation>
);

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddToCart;
