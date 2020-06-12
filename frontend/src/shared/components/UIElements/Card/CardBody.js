import React from 'react';

function CardBody(props) {
  const { date, title, text } = props;

  return (
    <div className="card-body">
      <p className="card-body--date">{date}</p>
      <h2>{title}</h2>
      <p className="card-body--content">{text}</p>
      {props.children}
      <button className="button button-primary">
        <i>More..</i>
      </button>
    </div>
  );
}

export default CardBody;
