import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';
import Pagination from './Pagination';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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
        <Query query={ALL_ITEMS_QUERY}>
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
