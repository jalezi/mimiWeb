import React from 'react';

import './AdminArticle.css';

const AdminArticle = props => {
  return (
    <div>
      <p>Title: {props.item.title}</p>
      <p>Date: {props.item.date}</p>
      <p>Created at: {props.item.createdAt}</p>
      <p>Updated at: {props.item.updatedAt}</p>
      <div>
        <button>EDIT</button>
        <button onClick={props.clicked}>DELETE</button>
      </div>
    </div>
  );
};

export default AdminArticle;
