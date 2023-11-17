import React, { useEffect , useState } from 'react';

import PurchaseOrderList from '../components/PurchaseOrderList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const PurchaseOrder = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPurchaseOrder, setLoadedPurchaseOrder] = useState();

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/po'
        );

        setLoadedPurchaseOrder(responseData.purchaseOrder);

      } catch (err) {}
    };
    fetchPurchaseOrder();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPurchaseOrder && <PurchaseOrderList items={loadedPurchaseOrder} />}
    </React.Fragment>
  );
};

export default PurchaseOrder;