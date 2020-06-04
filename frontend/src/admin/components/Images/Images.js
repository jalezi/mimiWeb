import React from 'react';

const Images = props => {
  let ImagesComponent = <p>No files to show!</p>;
  const images = props.images;
  if (images) {
    ImagesComponent = images.map(file => {
      let jsxElement = null;
      let imgSRC = '/api/gallery/images/';
      let formAction = '/api/gallery/files/';
      if (file.isImage) {
        imgSRC += file.filename;
        formAction += file._id + '?_method=DELETE';
        jsxElement = (
          <div key={file._id}>
            <div className="image-div">
              <img src={imgSRC} alt={file.filename} />
              <form method="POST" action={formAction}>
                <button>DELETE</button>
              </form>
            </div>
            <div className="polaroid">
              <img src={imgSRC} alt={file.filename} />
              <div className="container">
                <p>{file.filename}</p>
              </div>
            </div>
          </div>
        );
        return jsxElement;
      } else {
        return false;
      }
    });
    return ImagesComponent;
  }
};

Images.propTypes = {};

export default Images;
