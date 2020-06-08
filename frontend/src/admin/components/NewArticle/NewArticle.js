import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './NewArticle.css';
import { Editor } from '@tinymce/tinymce-react';
import { formatDate } from './../../../shared/util/utils';

const initialState = {
  date: formatDate(new Date()),
  title: '',
  body: '',
};

const NewArticle = props => {
  const [formData, newFormData] = useState({
    date: initialState.date,
    title: initialState.title,
  });
  const [body, newBody] = useState('');
  const [photos, setPhotos] = useState([]);

  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const onSubmit = async data => {
    console.log('[onSubmit] data: ', data);
    newFormData({ date: data.date, title: data.title, body, photos });

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, body, photos }),
      });
      const json = await response.json();
      const article = json.article;

      // TODO check if response not error and then update News state
      props.updateNewsState(article);
      newFormData({ ...initialState });
      props.close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditorChange = content => {
    newBody(content);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            ref={register}
            defaultValue={formData.date}
          />
        </div>
        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="New Title"
            ref={register({ required: true })}
            defaultValue={formData.title}
          />
          {errors.title && 'Title is required.'}
        </div>
        <div id="editor">
          <label className="label" htmlFor="body">
            Body
          </label>
          <Editor
            apiKey="drxdklp0uwvgvcxz0amzqgr787zdsz61sprkzl3jx3lz72il"
            id="body"
            textareaName="body"
            value={body}
            init={{
              selector: 'textarea',
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | anchor link | ' +
                'removeformat | help',
              default_link_target: '_blank',
            }}
            ref={register}
            onEditorChange={handleEditorChange}
          />
        </div>
        {/* <div id="photos">
          <div>
            <button>+</button>
            <button>-</button>
          </div>
          <div>
            <label className="label" htmlFor="defaultPhoto">
              Default photo
            </label>
            <input
              type="text"
              id="defaultPhoto"
              name="photo1"
              onChange={() => {
                console.log();
              }}></input>
          </div>
        </div> */}
        <input type="submit" value="PUBLISH" />
        <input type="reset" value="RESET" />
      </form>
    </React.Fragment>
  );
};

export default NewArticle;
