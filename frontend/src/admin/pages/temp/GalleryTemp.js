import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ImagesTemp from './ImagesTemp';

const GalleryTemp = () => {
  const [imageDocs, setImageDocs] = useState([]);

  useEffect(() => {
    async function loadImageDocs() {
      try {
        const response = await fetch('/api/gallery/images');
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const json = await response.json();
        const { files, photoDocs } = json;
        console.log('[GalleryTemp] files', files);
        console.log('[GalleryTemp] photoDocs', photoDocs);
        if (!photoDocs) {
          return;
        }
        if (photoDocs.length > 0) {
          setImageDocs([...photoDocs]);
          return;
        }
        return;
      } catch (error) {
        console.log(error);
      }
    }
    loadImageDocs();
  }, []);

  let img_Docs = imageDocs.length === 0 ? [] : imageDocs;

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
        <section id="admin-gallery">
          <h2>Temp Gallery</h2>
          <ImagesTemp imageDocs={[...img_Docs]} />
        </section>
      </div>
    </div>
  );
};

export default GalleryTemp;
