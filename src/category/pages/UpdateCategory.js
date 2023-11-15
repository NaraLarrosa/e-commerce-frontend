import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './CategoryForm.css';

const UpdateCategory = () => {
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCategory, setLoadedProduct] = useState();
  const cid = useParams().cid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = (
    {
      title: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/category/${cid}`
        );
        setLoadedProduct(responseData.category);
        setFormData(
          {
            name: {
              value: responseData.category.name,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, cid, setFormData]);

  const categoryUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/category/${cid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/category');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedCategory && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find category!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedCategory && (
        <form className="category-form" onSubmit={categoryUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedCategory.title}
            initialValid={true}
          />
          <Button type="submit" disabled= {!formState.isValid} >
            UPDATE CATEGORY
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateCategory;