import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Gallery.css';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadFilename, setUploadFileName] = useState('');
  const [uploadSize, setUploadSize] = useState(0);
  const [imageOutputSrc, setImageOutpupSrc] = useState();
  const [loading, changeLoading] = useState(false);
  const [loaded, changeLoaded] = useState(false);
  const [progress, changeProgress] = useState(0);
  let imageOutpupComponent = (
    <div>
      <div className="polaroid">
        <img src={imageOutputSrc} alt="upload" id="output" />
        <div className="container">
          <p>{uploadFilename}</p>
          <p>{uploadSize}</p>
        </div>
      </div>
    </div>
  );
  let ImagesComponent = <p>No files to show!</p>;

  useEffect(() => {
    fetch('/api/gallery/files')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
          });
        }
      })
      .then(files => {
        console.log('[Gallery] files:', files);
        // If error from backend
        if (files.code) {
          return;
        }

        files.map(file => {
          const isImage =
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png';
          file.isImage = isImage;
          return isImage;
        });

        return setImages([...files]);
      })
      .catch(err => {
        console.log(`Error, with message: ${err.statusText}`);
        return err;
      });
  }, []);

  if (images) {
    ImagesComponent = images.map(file => {
      let jsxElement = null;
      let imgSRC = '/api/gallery/image/';
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
  }

  const chooseFileChangeHandler = event => {
    setUploadSize(0);
    console.log(event.target);
    console.log(event.target.files);
    changeLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    const status = document.getElementById('status');
    if (!file) {
      status.textContent = 'Select the file';
      return;
    }
    if (!file.type) {
      status.textContent =
        'Error: The File.type property does not appear to be supported on this browser.';
      return;
    }
    if (!file.type.match('image.*')) {
      status.textContent =
        'Error: The selected file does not appear to be an image.';
      return;
    }

    reader.addEventListener('load', event => {
      console.log(event.target);
      setUploadFileName(file.name);

      setImageOutpupSrc(event.target.result);
      changeLoaded(true);
      changeLoading(false);
      const output = document.getElementById('output');
      output.src = event.target.result;
    });

    reader.addEventListener('progress', event => {
      if (event.loaded && event.total) {
        setUploadSize(formatBytes(event.total));
        const percent = (event.loaded / event.total) * 100;
        changeProgress(percent);
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Admin</h2>
      <div className="Admin">
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/admin" exact>
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/gallery">Gallery</NavLink>
            </li>
          </ul>
        </nav>
        <section id="admin-gallery-upload">
          <div>
            <h2>Mongo FIle Uploads</h2>
            <form
              action="/api/gallery/upload"
              method="POST"
              encType="multipart/form-data">
              <div>
                <label htmlFor="file">Choose File</label>
                <input
                  onChange={chooseFileChangeHandler}
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg, .jpeg, .png"></input>
              </div>

              {loading && <p id="status">{progress}</p>}
              <input type="submit" value="Submit" />
            </form>
            {loaded && imageOutpupComponent}
          </div>
        </section>
        <section id="admin-gallery">
          <h2>Gallery</h2>
          {ImagesComponent}
        </section>
      </div>
    </div>
  );
};

export default Gallery;
