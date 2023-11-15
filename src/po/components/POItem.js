import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './POItem.css';

const POItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/po/${props.id}`,
        'DELETE',
        null
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
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
        }
      >
        <p>
          Do you want to proceed and delete this purchase order?
        </p>
      </Modal>
      <li className="po-item">
        <Card className="po-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="po-item__info">
            <h2>{props.products}</h2>
            <p>{props.total}</p>
          </div>
          <div className="po-item__actions">
              <Button to={`/po/${props.id}`}>
                EDIT
              </Button>
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
              <Button type="button">
                ADD TO CART
              </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default POItem;