import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './NewArticle.css';

// should use moment package?
const formatDate = date => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const initialState = {
  date: formatDate(new Date()),
  title: '',
  body: '',
};

const NewArticle = props => {
  const [formData, newFormData] = useState({ ...initialState });
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const onSubmit = async data => {
    console.log('[NewArticle] [onSubmit] data: ', data);
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
      });
      newFormData({ ...initialState });
      history.push('/admin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          ref={register}
          defaultValue={formData.date}
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="New Title"
          ref={register({ required: true })}
          defaultValue={formData.title}
        />
        {errors.title && 'Title is required.'}
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          name="body"
          rows="5"
          cols="50"
          placeholder="Your text..."
          ref={register}
          defaultValue={formData.body}
        />
        <button type="submit">PUBLISH</button>
      </form>
    </React.Fragment>
  );
};

export default NewArticle;
