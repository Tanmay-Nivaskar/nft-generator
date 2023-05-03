import React, { useState } from 'react';
import mergeImages from 'merge-images';

const MyComponent = () => {
  const [mergedImageURL, setMergedImageURL] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [urls, setUrls] = useState([]);
  

  const handleImageUpload = (event) => {
    const imageFiles = event.target.files;
    setImageCount(imageFiles.length);
    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        
        setUrls(current => [...current, e.target.result]);

        if (newUrls.length === imageFiles.length) {
          setUrls(newUrls);
          setUploadComplete(true);
        }
      };

      fileReader.readAsDataURL(imageFiles[i]);
    console.log((urls))
     
    }
  };

  const handleImageMerge = async () => {
    const mergedImage = await mergeImages(urls);
    setMergedImageURL(mergedImage);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} multiple />
      
        <button onClick={handleImageMerge}>Merge Images</button>
      
      {mergedImageURL && <img src={mergedImageURL} alt="Merged Image" />}

      {/* <img src={url} alt="Image" /> */}
    </div>
  );
};

export default MyComponent;
