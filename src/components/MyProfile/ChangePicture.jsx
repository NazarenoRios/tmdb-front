import React, { useState } from "react";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ChangePicture() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((err) => {
            console.log(err.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <img src={url} alt="img"></img>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ChangePicture;
