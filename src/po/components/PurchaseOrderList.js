import React from 'react';

import PurchaseOrderItem from './PurchaseOrderItem';
import Card from '../../shared/components/UIElements/Card';
import './PurchaseOrdersList.css';

const PurchaseOrdersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No purchase orders found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="po-list">
      {props.items.products.map(purchaseOrder => (
        <PurchaseOrderItem
          key={purchaseOrder.id}
          id={purchaseOrder.product.id}
          name={purchaseOrder.product.name}
        />
      ))}
    </ul>
  );
};

export default PurchaseOrdersList;