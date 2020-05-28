import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
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
                <input type="file" name="file" id="file"></input>
              </div>
              <input type="submit" value="Submit" />
            </form>
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
