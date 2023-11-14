import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './CategoryItem.css';

const CategoryItem = props => {
  return (
    <li className="category-item">
      <Card className="category-item__content">
          <div className="category-item__info">
            <h2>{props.title}</h2>
            <p>{props.code}</p>
          </div>
      </Card>
    </li>
  );
};

export default CategoryItem;
