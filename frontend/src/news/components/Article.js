import React from 'react';
import { Parser as HtmlToReactParser } from 'html-to-react';
import { formatDate } from './../../shared/util/utils';
import Slides from './Slides';
import './Article.css';

const htmlToReactParser = new HtmlToReactParser();

const Article = props => {
  const reactElement = htmlToReactParser.parse(props.item.body);
  const date = formatDate(props.item.date);
  const images = [props.item.attachments.images];
  console.log('[Article]', images);

  return (
    <article id={props.item._id}>
      <Slides id={props.item._id} images={images} />
      <h2>{props.item.title}</h2>
      <h3>Date: {date}</h3>
      {reactElement}
    </article>
  );
};

export default Article;
