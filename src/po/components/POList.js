// import React from 'react';

// import POItem from './POItem';
// import Card from '../../shared/components/UIElements/Card';
// import './POList.css';

// const POList = props => {
//   if (props.items.length === 0) {
//     return (
//       <div className="center">
//         <Card>
//           <h2>No  purchase order found.</h2>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <ul className="po-list">
//       {props.items.map(po => (
//         <POItem
//           key={po.id}
//           id={po.id}
//           products={po.products[{ }]}
//           total={po.total}
         
//         />
//       ))}
//     </ul>
//   );
// };

// export default POList;


import React, { useState, useEffect } from 'react';
import Card from '../../shared/components/UIElements/Card';
import './POList.css';
import axios from 'axios';

const POList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener las órdenes de compra desde el backend
    axios.get('http://localhost:5000/api/po')
      .then(response => setPurchaseOrders(response.data))
      .catch(error => console.error('Error fetching purchase orders', error));
  }, []);

  return (
    <div>
      <Card>
        <h2>Purchase Orders</h2>
      </Card>
        <ul className="po-list">
        {purchaseOrders.map(po => (
          <li key={po._id}>{po.poid}</li>
        ))}
      </ul>
    </div>
  );
};

export default POList;