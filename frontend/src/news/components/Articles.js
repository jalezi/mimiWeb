import React, { Fragment } from 'react';
import Article from './Article';

const Articles = props => {
  let htmlElements;
  if (props.articles) {
    htmlElements = props.articles.map(item => (
      <Fragment key={item._id}>
        <Article id={item._id} item={item} />
        <hr />
      </Fragment>
    ));
  } else {
    htmlElements = null;
  }
  return <React.Fragment>{htmlElements}</React.Fragment>;
};

export default Articles;
