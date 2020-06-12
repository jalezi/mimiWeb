import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

import './Card.css';

function Card(props) {
  const { date, title, textTitle, text } = props;
  return (
    <div className="card">
      <CardHeader title={title} />
      <CardBody date={date} date={date} title={textTitle} text={text}>
        {props.children}
      </CardBody>
    </div>
  );
}

export default Card;
