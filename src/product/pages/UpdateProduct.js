import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProductForm.css';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';

const UpdateProduct = () => {
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();
  const pid = useParams().pid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      color: {
        value: '',
        isValid: false
      },
      price: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/product/${pid}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            name: {
              value: responseData.product.name,
              isValid: true
            },
            description: {
              value: responseData.product.description,
              isValid: true
            },
            color: {
              value: responseData.product.color,
              isValid: true
            },
            price: {
              value: responseData.product.price,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchProduct();
  }, [sendRequest, pid, setFormData]);

  const productUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/product/${pid}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          color: formState.inputs.color.value,
          price: formState.inputs.price.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find product!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProduct && (
        <form className="product-form" onSubmit={productUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedProduct.name}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            initialValue={loadedProduct.description}
            initialValid={true}
          />
          <Input
            id="color"
            element="text"
            label="Color"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid color"
            onInput={inputHandler}
            initialValue={loadedProduct.color}
            initialValid={true}
          />
          <Input
            id="price"
            element="number"
            label="Price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid price"
            onInput={inputHandler}
            initialValue={loadedProduct.price}
            initialValid={true}
          />
          <Button type="submit" >
            UPDATE PRODUCT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProduct;
