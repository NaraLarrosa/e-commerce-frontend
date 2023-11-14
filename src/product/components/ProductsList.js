import React from 'react';

import ProductItem from './ProductItem';
import Card from '../../shared/components/UIElements/Card';
import './ProductsList.css';

const ProductsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No products found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="products-list">
      {props.items.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          color={product.color}
          barcode={product.barcode}
          price={product.price}
          category={product.category}
        />
      ))}
    </ul>
  );
};

export default ProductsList;