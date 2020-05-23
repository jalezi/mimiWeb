import React from 'react';
import Article from './Article';

const Articles = props => {
  let htmlElements;
  if (props.articles) {
    htmlElements = props.articles.map(item => (
      <Article key={item._id} item={item} />
    ));
  } else {
    htmlElements = null;
  }
  return <React.Fragment>{htmlElements}</React.Fragment>;
};

export default Articles;
