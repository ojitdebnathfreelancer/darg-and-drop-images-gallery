import React, { useRef } from "react";
import img1 from "../../assets/images/image-1.webp";
import img2 from "../../assets/images/image-2.webp";
import img3 from "../../assets/images/image-3.webp";
import img4 from "../../assets/images/image-4.webp";
import img5 from "../../assets/images/image-5.webp";
import img6 from "../../assets/images/image-6.webp";
import img7 from "../../assets/images/image-7.webp";
import img8 from "../../assets/images/image-8.webp";
import uploadIcon from "../../assets/image-upload-icon/upload-icon.png";
import { useState } from "react";

const Home = () => {
  const uploadRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const handleImageClick = () => {
    uploadRef.current.click();
  };

  return (
    <div className="home-page">
      <h2>
        Gallery
        {/* <span className="selected-text">
          <input type="checkbox" />3 Files Selected
        </span> */}
        <button type="button" className="delete">
          Delete files
        </button>
      </h2>

      <div className="gallery-container">
        <div className="image-item large-item">
          <img src={img1} alt="image" />
          <div className="image-item-overlay">
            <input type="checkbox" />
          </div>
        </div>
        <div className="image-item">
          <img src={img2} alt="image" />
        </div>
        <div className="image-item">
          <img src={img3} alt="image" />
        </div>
        <div className="image-item">
          <img src={img4} alt="image" />
        </div>
        <div className="image-item">
          <img src={img5} alt="image" />
        </div>
        <div className="image-item">
          <img src={img6} alt="image" />
        </div>
        <div className="image-item">
          <img src={img7} alt="image" />
        </div>
        <div className="image-item">
          <img src={img8} alt="image" />
        </div>

        <div className="add-image-item" onClick={() => handleImageClick()}>
          <input
            ref={uploadRef}
            type="file"
            accept="image/jpg, image/jpeg, image/png,image/webp"
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
          <div className="icon-div">
            <img src={uploadIcon} alt="upload icon" />
            <p>Add Images</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
