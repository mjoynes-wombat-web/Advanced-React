import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where: { id: $id }) {
    id
    title
    description
    price
  }
}
`;

class UpdateItem extends Component {
  state = {};

  handleChange = (e) => {
    const { target } = e;
    const { name, type, value } = target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const { id } = this.props;
    const res = await updateItemMutation({
      variables: {
        id,
        ...this.state,
      },
    });
    console.log(res);
  }

  render() {
    const {
      id,
    } = this.props;
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for {id}.</p>;
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a Description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export { UPDATE_ITEM_MUTATION };
export default UpdateItem;
