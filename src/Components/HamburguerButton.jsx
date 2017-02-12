import React from 'react';

const HamburguerButton = ({ ...props }) => {
  return (
    <button
      className="btn btn-dark btn-lg toggle"
      onClick={props.onClick}
    >
      <i className="fa fa-bars"></i>
    </button>
  );
};

export default HamburguerButton;
