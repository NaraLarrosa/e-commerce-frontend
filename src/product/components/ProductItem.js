import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './ProductItem.css';

const ProductItem = props => {
  return (
    <li className="product-item">
      <Card className="product-item__content">
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.color}</p>
            <p>{props.barcode}</p>
            <p>{props.price}</p>
            <p>{props.category}</p>
            <button type="button">Add to cart</button>
          </div>
      </Card>
    </li>
  );
};

export default ProductItem;
