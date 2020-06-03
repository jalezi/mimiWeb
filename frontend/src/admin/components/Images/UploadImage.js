import React from 'react';

const UploadImage = props => {
  return (
    <div>
      <div className="polaroid">
        <img src={props.src} alt="uploadPic" id="output" />
        <div className="container">
          <p>{props.filename}</p>
          <p>{props.size}</p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
