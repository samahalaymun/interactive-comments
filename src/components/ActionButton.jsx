import React from 'react';

function ActionButton({type,onClick}) {
 
  return (
    <button className={` action-btn action-btn--${type}`} onClick={onClick}>
      <img alt="action" src={`/src/assets/icon-${type}.svg`} />
      {type} 
    </button>
  );
}

export default ActionButton
