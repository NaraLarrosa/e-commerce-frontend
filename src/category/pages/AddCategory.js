import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './CategoryForm.css';

import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const AddCategory = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
        title: {
            value: '',
            isValid: false
        },
        code: {
            value: '',
            isValid: false
        }
    },false
  );

  const history = useHistory();

  const categorySubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('code', formState.inputs.code.value);
      await sendRequest('http://localhost:5000/api/category/create', 'POST', JSON.stringify({
        title: formState.inputs.title.value,
        code: formState.inputs.code.value,
      }), {
        'Content-Type': 'application/json'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="category-form" onSubmit={categorySubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="code"
          element="textarea"
          label="Code"
          validators={[VALIDATOR_REQUIRE(5)]}
          errorText="Please enter a valid code."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD CATEGORY
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddCategory;