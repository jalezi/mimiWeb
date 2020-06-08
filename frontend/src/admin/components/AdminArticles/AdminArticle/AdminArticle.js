import React from 'react';

import './AdminArticle.css';

const AdminArticle = props => {
  const imagesDocs = props.item.attachments.images.map(item => {
    return item._id;
  });
  return (
    <div>
      <p>Title: {props.item.title}</p>
      <p>Date: {props.item.date}</p>
      <p>Created at: {props.item.createdAt}</p>
      <p>Updated at: {props.item.updatedAt}</p>
      <p>Tags: {props.item.tags}</p>
      <p>Photos: {imagesDocs}</p>
      <p>Files: {props.item.attachments.files}</p>
      <div>
        <button>EDIT</button>
        <button onClick={props.clicked}>DELETE</button>
      </div>
    </div>
  );
};

export default AdminArticle;
