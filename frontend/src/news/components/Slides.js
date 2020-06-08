import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import './Slides.css';

const Slides = props => {
  const [slideImages, setSlideImages] = useState(...props.images);
  const [slideIndex, setSlideIndex] = useState(1);
  const articleId = props.id;
  const baseURL = 'http://localhost:5000/api/gallery/images/';

  console.log('[Slides] slideImages: ', slideImages);
  const slides = slideImages.map(item => {
    const imgSRC = baseURL + item.fn;
    return <Slide key={item._id} imageSRC={imgSRC} />;
  });

  const dots = slideImages.map((item, index) => {
    return (
      <span
        key={'span-' + item._id}
        className="dot"
        onClick={event => {
          currentSlide(event, index + 1);
        }}></span>
    );
  });

  const showSlides = (articleHtmlElem, n) => {
    console.log('articleHtmlElement', articleHtmlElem);
    var i;
    var slidesHtml = articleHtmlElem.getElementsByClassName('mySlides');
    console.log('[showSlides] slidesHtml: ', slidesHtml);
    if (slidesHtml.length > 0) {
      var dots = articleHtmlElem.getElementsByClassName('dot');
      if (n > slidesHtml.length) {
        return setSlideIndex(1);
      }
      if (n < 1) {
        return setSlideIndex(slidesHtml.length);
      }
      for (i = 0; i < slidesHtml.length; i++) {
        slidesHtml[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slidesHtml[slideIndex - 1].style.display = 'block';
      dots[slideIndex - 1].className += ' active';
    }
  };

  const plusSlides = (event, n) => {
    console.dir(event.target);
    const parentDiv = event.target.parentNode;
    const parentArticle = parentDiv.parentNode;
    const newIndex = slideIndex + n;
    showSlides(parentArticle, newIndex);
    setSlideIndex(newIndex);
  };

  const currentSlide = (event, n) => {
    console.dir(event.target);
    const parentDiv = event.target.parentNode;
    const parentArticle = parentDiv.parentNode.parentNode;
    showSlides(parentArticle, n);
    setSlideIndex(n);
  };
  useEffect(function () {
    const articleHtmlElem = document.getElementById(articleId);
    showSlides(articleHtmlElem, slideIndex);
  });

  return (
    <div className="slideshow-container">
      {slides}
      <button
        className="prev"
        onClick={event => {
          plusSlides(event, -1);
        }}>
        &#10094;
      </button>
      <button
        className="next"
        onClick={event => {
          plusSlides(event, -1);
        }}>
        &#10095;
      </button>
      <br />
      <div className="div-dot">{dots}</div>
    </div>
  );
};

export default Slides;
