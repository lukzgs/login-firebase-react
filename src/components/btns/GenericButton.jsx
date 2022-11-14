import React from 'react';

export const GenericButton = (props) => {
  return (
    <div 
      className={ props.div.className }
      id={ props.div.id ? props.div.id : null }
    >
      <button
        id={ props.button.id }
        className={ props.button.className }
        onClick={ props.button.onClick ? () => props.button.onClick() : null }
      >
        { props.button.description ? props.button.description : 
          <svg 
            className={ props.button.svg.className }
            viewBox={ props.button.svg.viewBox }
          >
            <path d={ props.button.svg.path.d } />
          </svg> 
        }
      </button>
    </div>
  );
};
