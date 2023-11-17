import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PurchaseOrderItem.css';

const PurchaseOrderItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <li className="po-item">
        <Card className="po-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="po-item__info">
            <h2>{props.name}</h2>
            <p>{props.id}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PurchaseOrderItem;
