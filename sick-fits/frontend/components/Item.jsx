import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

import formatMoney from '../lib/formatMoney';

class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <image src={item.image} alt={item.title} />}
        <Title>
          <Link href={{
            pathname: '/item',
            query: { id: item.id },
          }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{
            pathname: 'update',
            query: { id: item.id },
          }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>Add To Cart</button>
          <button>Delete</button>
        </div>
      </ItemStyles>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    largeImage: PropTypes.string,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
