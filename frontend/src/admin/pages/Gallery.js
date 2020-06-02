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
  const [imageOutputSrc, setImageOutputSrc] = useState();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
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
    const target = event.target || event.srcElement;

    changeLoading(true);
    changeLoaded(false);
    setImageSize({ width: 0, height: 0 });
    setImageOutputSrc('');
    setUploadFileName('');
    setUploadSize(0);

    // TODO What should I do with you?
    const status = document.getElementById('status');

    if (target.files.length === 0) {
      status.textContent = 'Select the file';
      changeLoading(false);
      changeLoaded(false);
      return;
    }

    const file = target.files[0];
    const reader = new FileReader();

    // TODO Research if needed while input has attr accept=".jpg, .jpeg, .png"
    if (!file.type) {
      changeLoading(false);
      status.textContent =
        'Error: The File.type property does not appear to be supported on this browser.';
      return;
    }
    if (!file.type.match('image.*') && !loaded) {
      changeLoading(false);
      status.textContent =
        'Error: The selected file does not appear to be an image.';
      return;
    }

    reader.addEventListener('load', event => {
      setUploadFileName(file.name);
      setImageOutputSrc(event.target.result);
      changeLoaded(true);
      const output = document.getElementById('output');
      output.src = event.target.result;

      document.getElementById('output').addEventListener('load', function () {
        const sizes = {
          height: this.naturalWidth,
          width: this.naturalHeight,
        };
        setImageSize({ ...sizes });
        console.log(sizes);
      });

      changeLoading(false);
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

  const submitHandler = async event => {
    event.preventDefault();
    const form = document.getElementById('fileForm');

    const formData = new FormData(form);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    const response = await fetch('/api/gallery/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    const fileDoc = json.file;

    fileDoc.isImage = true;
    fileDoc._id = fileDoc.id;
    setImages([fileDoc, ...images]);
    changeLoading(false);
    changeLoaded(false);
    setImageSize({ width: 0, height: 0 });
    setImageOutputSrc('');
    setUploadFileName('');
    setUploadSize(0);
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
            <form id="fileForm" name="fileForm" method="POST">
              <div>
                <label htmlFor="file">Choose File</label>
                <input
                  onChange={chooseFileChangeHandler}
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg, .jpeg, .png"></input>
                <input
                  hidden
                  type="number"
                  name="width"
                  value={imageSize.width}
                  readOnly
                />
                <input
                  hidden
                  type="number"
                  name="height"
                  value={imageSize.height}
                  readOnly
                />
              </div>

              {!loading && <p id="status"></p>}
              {loading && <p id="progres">{progress}</p>}
              <input
                onClick={submitHandler}
                type="button"
                value="Submit"
                disabled={!loaded}
              />
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
