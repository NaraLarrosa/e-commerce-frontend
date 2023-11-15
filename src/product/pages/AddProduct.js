import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProductForm.css';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

const AddProduct = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
        name: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        barcode: {
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
        },
        category: {
            value: '',
            isValid: false
        }
    },false
  );

  const history = useHistory();

  const productSubmitHandler = async event => {
    event.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append('name', formState.inputs.name.value);
      // formData.append('description', formState.inputs.description.value);
      // formData.append('barcode', formState.inputs.barcode.value);
      // formData.append('color', formState.inputs.color.value);
      // formData.append('price', formState.inputs.price.value);
      // formData.append('category', formState.inputs.category.value);
      await sendRequest('http://localhost:5000/api/product/create', 'POST', JSON.stringify({
        name: formState.inputs.name.value,
        description: formState.inputs.description.value,
        barcode: formState.inputs.barcode.value,
        color: formState.inputs.color.value,
        price: formState.inputs.price.value,
        category: formState.inputs.category.value
      }), {
        'Content-Type': 'application/json'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="barcode"
          element="input"
          label="Barcode"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid barcode."
          onInput={inputHandler}
        />
        <Input
          id="color"
          element="input"
          type="text"
          label="Color"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid color."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
        />
        <Input
          id="category"
          element="input"
          type="text"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddProduct;