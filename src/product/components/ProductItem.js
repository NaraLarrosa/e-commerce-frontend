import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProductItem.css';

const ProductItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  
  const history = useHistory();

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/product/${props.id}`,
        'DELETE',
        null
      );
      props.onDelete(props.id);
      
      history.push('/');

    } catch (err) {}
  };

  const addCartHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/po/add`,
        'PUT', JSON.stringify({
          pid: props.id,
          quantity: 1,
          poid: '6556cd9f112e990bb5819130'
        }), {
          'Content-Type': 'application/json'
      });
      
      history.push('/');

    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        header={props.address}
        contentClass="product-item__modal-content"
        footerClass="product-item__modal-actions"
      >
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="product-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this product?
        </p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="product-item__info">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>Color: {props.color}</p>
            <p>{props.barcode}</p>
            <p><b>Precio: USD {props.price}</b></p>
            <p>{props.category}</p>
          </div>
          <div className="product-item__actions">
              <Button to={`/product/${props.id}`}>
                EDIT
              </Button>
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
              <Button className="agregar-carrito" type="button" onClick={addCartHandler}>
                ADD TO CART
              </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
