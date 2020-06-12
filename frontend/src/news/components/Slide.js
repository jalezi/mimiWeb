import React from 'react';
import './Slide.css';

const Slide = props => {
  return (
    <div key={props.id} className="mySlides fade">
      <img src={props.imageSRC} alt="Hello" />
    </div>
  );
};

export default Slide;
