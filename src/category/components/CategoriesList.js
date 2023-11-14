import React from 'react';

import CategoryItem from './CategoryItem';
import Card from '../../shared/components/UIElements/Card';
import './CategoriesList.css';

const CategoriesList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No categories found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="categories-list">
      {props.items.map(category => (
        <CategoryItem
          key={category.id}
          id={category.id}
          title={category.title}
          code={category.code}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;