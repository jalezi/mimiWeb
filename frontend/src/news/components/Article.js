import React from 'react';

const Article = props => {
  return (
    <article>
      <h3>{props.item.title}</h3>
      <p>{props.item.body}</p>
    </article>
  );
};

export default Article;
