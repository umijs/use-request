import React from 'react';

export default () => {

  return (
    <div 
      onClick={() => {
        history.back();
      }}
    >
      back
    </div>
  )
}
