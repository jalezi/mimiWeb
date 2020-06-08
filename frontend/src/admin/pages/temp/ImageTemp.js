import React from 'react';
import { formatBytes } from '../../../shared/util/utils';

const ImageTemp = props => {
  const baseUrl = 'http://localhost:5000/api/gallery/images/';
  const { fn, fileId, name, originalSize, size, default: def } = props.image;
  let formAction = `/api/gallery/files/${fileId}?_method=DELETE`;
  console.log('[ImageTemp] props: ', props);
  const url = baseUrl + fn;
  const fileSize = formatBytes(size);
  const photoSize = { ...originalSize };

  return (
    <div id={fileId} className="parent">
      <div className="div1">
        <img src={url} alt={name} />
      </div>
      <div className="div2">
        <p>name: {name}</p>
        <p>filename: {fn}</p>
        <p>file size: {fileSize}</p>
        <p>photo width: {photoSize.width}</p>
        <p>photo height: {photoSize.width}</p>
        <p>default: {def.toString()}</p>
      </div>
      <div className="div3">
        <button onClick={props.delete}>DELETE</button>
        <button onClick={event => event.preventDefault()} disabled>
          EDIT
        </button>
      </div>
    </div>
  );
};

export default ImageTemp;
