import React from 'react';
import { Parser as HtmlToReactParser } from 'html-to-react';
import { formatDate } from './../../shared/util/utils';

const htmlToReactParser = new HtmlToReactParser();

const Article = props => {
  const reactElement = htmlToReactParser.parse(props.item.body);
  const date = formatDate(props.item.date);

  return (
    <article id={props.item._id}>
      <h2>{props.item.title}</h2>
      <h3>Date: {date}</h3>
      {reactElement}
    </article>
  );
};

export default Article;
