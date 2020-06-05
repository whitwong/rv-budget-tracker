import React from 'react';

const ExpenseCardList = ({ list }) => {
  return(
    <div className="category-list">
    {
      list &&
      list.map((listItem, index) => (
        <div 
          className="category-item"
          key={index}
          index={index}
        >
          {listItem}
        </div>
      ))
    }
  </div>
  );
};

export default ExpenseCardList;