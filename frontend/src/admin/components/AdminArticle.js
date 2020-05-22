import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminArticle = props => {
  const history = useHistory();

  const onDeleteHandler = async (event, id) => {
    event.preventDefault();
    console.log(`[AdminArticle] [onDeleteHandler] id: ${id}`);
    try {
      await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        body: null,
      });

      history.push('/admin');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>Title: {props.item.title}</div>
      <div>Date: {props.item.date}</div>
      <div>Created at: {props.item.createdAt}</div>
      <div>Updated at: {props.item.updatedAt}</div>
      <div>
        <button>EDIT</button>
        <button onClick={(event, id) => onDeleteHandler(event, props.item._id)}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default AdminArticle;
