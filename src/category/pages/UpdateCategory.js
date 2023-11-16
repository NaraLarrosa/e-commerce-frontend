import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './CategoryForm.css';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';

const UpdateCategory = () => {
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCategory, setLoadedCategory] = useState();
  const cid = useParams().cid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/category/${cid}`
        );
        setLoadedCategory(responseData.category);
        setFormData(
          {
            title: {
              value: responseData.category.title,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchCategory();
  }, [sendRequest, cid, setFormData]);

  const categoryUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/category/${cid}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/categories');
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
          <h2>Could not find Category!</h2>
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
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={loadedCategory.name}
            initialValid={true}
          />
          <Button type="submit" >
            UPDATE CATEGORY
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateCategory;