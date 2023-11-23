import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import '@fortawesome/fontawesome-free/css/all.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';

const PurchaseOrdersList = (props) => {
  
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pid, setPid] = useState('');

  const updatePOHandler = async (productId, updatedQuantity) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/po/update`,
        'PATCH', 
        JSON.stringify({ 
          quantity: updatedQuantity,
          poid: '6556cd9f112e990bb5819130',
          pid: productId 
        }),
        {
          'Content-Type': 'application/json'
      });
    } catch (err) { }
  };

  const showDeleteWarningHandler = (idProduct) => {
    setShowConfirmModal(true);
    setPid(idProduct);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  
  const history = useHistory();

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/po/delete/6556cd9f112e990bb5819130/${pid}`,
        'DELETE',
        null
      );
      props.onDelete(pid);
      
      history.push('/po');

    } catch (err) {}
  };

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No purchase orders found.</h2>
        </Card>
      </div>
    );
  }

  // const tableStyle = {
  //   borderCollapse: 'collapse',
  //   width: '96%',
  //   margin: '20px',
  //   padding:'left'
  // };

  // const cellStyle = {
  //   border: '1px solid #ddd',
  //   padding: '8px',
  //   textAlign: 'left'
  // };

  // const headerStyle = {
  //   backgroundColor: '#f2f2f2',
  //   padding: '12px',
  //   textAlign: 'center',
  // };

  // const bodyStyle = {
  //   backgroundColor: 'white',
  //   padding: '12px',
  // //   textAlign: 'center',
  // };

  const h2Style = {
    textAlign: '-webkit-right',
    marginRight: '25px'
  }

  const btnStyle = {
    color: '#f34343',
    backgroundColor: 'white',
    border: '1px',
    padding: '8px',
    borderRadius: '15px'
  }

    return (
//         <div>
//             <h1>PURCHASE ORDER:</h1>
//             <ErrorModal error={error} onClear={clearError} />
//             <Modal
//             header={props.address}
//             contentClass="po-item__modal-content"
//             footerClass="po-item__modal-actions"
//             >
//             </Modal>
//             <Modal
//             show={showConfirmModal}
//             onCancel={cancelDeleteHandler}
//             header="Are you sure?"
//             footerClass="po-item__modal-actions"
//             footer={
//                 <React.Fragment>
//                 <Button inverse onClick={cancelDeleteHandler}>
//                     CANCEL
//                 </Button>
//                 <Button danger onClick={confirmDeleteHandler}>
//                     DELETE
//                 </Button>
//                 </React.Fragment>
//             }
//             ></Modal>
//             <table style={tableStyle}>
//             {isLoading && <LoadingSpinner asOverlay />}
//             <thead>
//                 <tr style={headerStyle}>
//                 <th>PRODUCT</th>
//                 <th>PRICE</th>
//                 <th>QUANTITY</th>
//                 <th>SUBTOTAL</th>
//                 <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.items.products.map(purchaseOrder => (
//                 <tr style={bodyStyle} key={purchaseOrder.id}>
//                     <td style={cellStyle}>{purchaseOrder.product.name}</td>
//                     <td style={cellStyle}>{purchaseOrder.product.price}</td>
//                     <td style={cellStyle}>
//                     <input type="number" 
//                         value={purchaseOrder.quantity} 
//                         onChange= {(e) => {
//                         const updatedQuantity = e.target.value;
//                         updatePOHandler(purchaseOrder.product.id, updatedQuantity);
//                         }}>
//                     </input>
//                     </td>
//                     <td style={cellStyle}>{purchaseOrder.product.price*purchaseOrder.quantity}</td>
//                     <td style={cellStyle}>
//                     <button style={btnStyle} onClick={() => showDeleteWarningHandler(purchaseOrder.product.id)}>
//                         <i class="fa-solid fa-trash-can"></i>
//                     </button>
//                     </td>
//                 </tr>
//                 ))}
//             </tbody>
//             </table>
//             <h2 style={h2Style}>TOTAL: {props.items.total}</h2>
//         </div>
//     );
// };
    
    
    <div>
        <h1>PURCHASE ORDER:</h1>
        <ErrorModal error={error} onClear={clearError} />
        <Modal
            header={props.address}
            contentClass="po-item__modal-content"
            footerClass="po-item__modal-actions"
        >
        </Modal>
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="po-item__modal-actions"
            footer={
                <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>
                    CANCEL
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                    DELETE
                </Button>
                </React.Fragment>
            }>
        </Modal>
        <TableContainer component={Paper}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>PRODUCT</TableCell>
                        <TableCell align="right">PRICE</TableCell>
                        <TableCell align="right">QUANTITY</TableCell>
                        <TableCell align="right">SUBTOTAL</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.products.map((purchaseOrder) => (
                        <TableRow key={purchaseOrder.id}>
                            <TableCell component="th" scope="row">
                                {purchaseOrder.product.name}
                            </TableCell>
                            <TableCell align="right">
                                {purchaseOrder.product.price}
                            </TableCell>
                            <TableCell align="right">
                                <TextField type="number"
                                        label="hello"
                                        value={purchaseOrder.quantity} 
                                        InputProps={{
                                            shrink: true,
                                          }}
                                        onChange= {(e) => {
                                            const updatedQuantity = e.target.value;
                                            updatePOHandler(purchaseOrder.product.id, updatedQuantity);
                                        }}>
                                </TextField>
                            </TableCell>
                            <TableCell align="right">
                                {purchaseOrder.product.price * purchaseOrder.quantity}
                            </TableCell>
                            <TableCell align="right">
                                <ButtonBase style={btnStyle} onClick={() => showDeleteWarningHandler(purchaseOrder.product.id)}>
                                    <i class="fa-solid fa-trash-can"></i>
                                </ButtonBase>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
       <h2 style={h2Style}>TOTAL: {props.items.total}</h2>
    </div>
)
};

export default PurchaseOrdersList;
