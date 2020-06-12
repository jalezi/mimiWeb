import React from 'react';

function CardHeader(props) {
  return (
    <header className="card-header">
      <h4 className="card-header--title">{props.title}</h4>
    </header>
  );
}

export default CardHeader;
