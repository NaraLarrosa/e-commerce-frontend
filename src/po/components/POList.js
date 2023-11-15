import React from 'react';

import POItem from './POItem';
import Card from '../../shared/components/UIElements/Card';
import './POList.css';

const POList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No  purchase order found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="po-list">
      {props.items.map(product => (
        <POItem
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

export default POList;