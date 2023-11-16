// import React from 'react';
// import { useHistory } from 'react-router-dom';

// import Input from '../../shared/components/FormElements/Input';
// import Button from '../../shared/components/FormElements/Button';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
// import './POForm.css';

// import {
//   VALIDATOR_REQUIRE
// } from '../../shared/util/validators';

// const AddPO = () => {
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [formState, inputHandler] = useForm(
//     {
//         name: {
//             value: '',
//             isValid: false
//         },
//         description: {
//             value: '',
//             isValid: false
//         },
//         barcode: {
//             value: '',
//             isValid: false
//         },
//         color: {
//             value: '',
//             isValid: false
//         },
//         price: {
//             value: '',
//             isValid: false
//         },
//         category: {
//             value: '',
//             isValid: false
//         }
//     },false
//   );

//   const history = useHistory();

//   const poSubmitHandler = async event => {
//     event.preventDefault();
//     try {
//       await sendRequest('http://localhost:5000/api/po/create', 'POST', JSON.stringify({
//         products: formState.inputs.products.value,
//         total: formState.inputs.total.value,
//       }), {
//         'Content-Type': 'application/json'
//       });
//       history.push('/');
//     } catch (err) {}
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <form className="product-form" onSubmit={poSubmitHandler}>
//         {isLoading && <LoadingSpinner asOverlay />}
//         <Input
//           id="product"
//           element="input"
//           type="text"
//           label="product"
//           validators={[VALIDATOR_REQUIRE()]}
//           onInput={inputHandler}
//         />
//         <Input
//           id="total"
//           element="number"
//           label="total"
//           validators={[VALIDATOR_REQUIRE()]}
//           onInput={inputHandler}
//         />
//         <Button type="submit" disabled={!formState.isValid}>
//           ADD TO CART
//         </Button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default AddPO;


// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const AddPO = () => {
// //   const [orderNumber, setOrderName] = useState('');

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       // Realizar la solicitud POST para crear una nueva orden de compra
// //       await axios.post('http://localhost:3001/api/po/create', { orderNumber });
// //       console.log('Purchase order created successfully!');
// //     } catch (error) {
// //       console.error('Error creating purchase order', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>New Purchase Order</h2>
// //       <form onSubmit={handleFormSubmit}>
// //         <label>
// //           Nombre de la Orden:
// //           <input type="text" value={orderNumber} onChange={(e) => setOrderName(e.target.value)} />
// //         </label>
// //         <button type="submit">Create PurchaseOrder</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddPO;
