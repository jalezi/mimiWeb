import React from 'react';
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

const Article = props => {
  var reactElement = htmlToReactParser.parse(props.item.body);

  return (
    <article id={props.item._id}>
      <h3>{props.item.title}</h3>
      {reactElement}
    </article>
  );
};

export default Article;
