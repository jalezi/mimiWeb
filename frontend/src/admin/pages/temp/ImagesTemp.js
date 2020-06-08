import React from 'react';
import ImageTemp from './ImageTemp';

const ImagesTemp = props => {
  console.log('[ImagesTemp] imageDocs', props.imageDocs);
  const imageDocs = [...props.imageDocs];

  const deleteHandler = async event => {
    console.log(event.target.parentElement.parentElement.id);
    const id = event.target.parentElement.parentElement.id;
    const img = imageDocs.filter((item, index) => {
      console.log(item.fileId === id, item.fileId);
      return item.fileId === id;
    })[0];
    console.log(img);
    let formAction = `/api/gallery/files/${id}?_method=DELETE`;
    // do not delete if picture is default
    // TODO notify user
    if (img.default) {
      console.log('do not delete');
      alert('Can not delete default photo!');
      return;
    }
    console.log(formAction);
    try {
      const response = await fetch(formAction, { method: 'DELETE' });
      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  let ImagesComponent = <p>No photos to show!</p>;
  if (imageDocs.length > 0) {
    ImagesComponent = imageDocs.map(image => {
      return (
        <ImageTemp
          key={image.fileId}
          image={image}
          delete={event => deleteHandler(event)}
        />
      );
    });
  }

  return ImagesComponent;
};

export default ImagesTemp;
