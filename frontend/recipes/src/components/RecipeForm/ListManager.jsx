import React from 'react';

function ListManager({ items, onDelete, renderItem, itemKey}) {
  return (
    <ul>
      {items.map((item, index) => (
        <div className="list-item" key={itemKey(item + index)}>
          <li>{renderItem(item, index)}</li>
          <button onClick={() => onDelete(item)}>x</button>
        </div>
      ))}
    </ul>
  );
}

export default ListManager;