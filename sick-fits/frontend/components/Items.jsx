import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth}
`;

class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: (page * perPage) - perPage,
          }}
        >
          {({
            data: { items },
            error,
            loading,
          }) => {
            if (loading) return <p>Loading.p..</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {items.map(item => <Item key={item.id} item={item} />)}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={page} />
      </Center>
    );
  }
}

Items.propTypes = {
  page: PropTypes.number.isRequired,
};

export { ALL_ITEMS_QUERY };
export default Items;
