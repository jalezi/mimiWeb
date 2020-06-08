import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Gallery.css';
import Images from './../components/Images/Images';
import UploadImage from '../components/Images/UploadImage';
import { formatBytes } from '../../shared/util/utils';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imagesData, setImagesData] = useState();
  const [uploadFilename, setUploadFileName] = useState('');
  const [uploadSize, setUploadSize] = useState(0);
  const [imageOutputSrc, setImageOutputSrc] = useState();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loading, changeLoading] = useState(false);
  const [loaded, changeLoaded] = useState(false);
  const [progress, changeProgress] = useState(0);

  // image to be uploaded component
  let imageOutputComponent = (
    <UploadImage
      src={imageOutputSrc}
      filename={uploadFilename}
      size={uploadSize}
    />
  );

  // fetch all photos from db
  useEffect(() => {
    fetch('/api/gallery/images')
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
      .then(result => {
        const { files, photoDocs, code, msg } = result;
        console.log('[Gallery] files:', files);
        console.log('[Gallery] photos:', photoDocs);
        // If error from backend
        console.log(code, msg);
        if (code) {
          return;
        }
        setImages([...files]);
        setImagesData([...photoDocs]);
        return;
      })
      .catch(err => {
        console.log(`Error, with message: ${err.message}`);
        return err;
      });
  }, []);

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

    // Check if no file selected
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
            <li>
              <NavLink to="/admin/galleryTemp">Temp Gallery</NavLink>
            </li>
          </ul>
        </nav>
        <section id="admin-gallery-upload">
          <div>
            <h2>Mongo File Uploads</h2>
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
            {loaded && imageOutputComponent}
          </div>
        </section>

        <section id="admin-gallery">
          <h2>Gallery</h2>
          <Images images={images} data={imagesData} />
        </section>
      </div>
    </div>
  );
};

export default Gallery;
