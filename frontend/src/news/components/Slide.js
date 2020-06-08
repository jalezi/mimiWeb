import React from 'react';
import './Slide.css';

const Slide = props => {
  return (
    <div key={props.id} className="mySlides fade">
      <div className="numbertext">1 / 3</div>
      <img src={props.imageSRC} alt="Hello" />
      <div className="text">Caption Text</div>
    </div>
  );
};

export default Slide;
