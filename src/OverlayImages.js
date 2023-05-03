// import React, { useState, useEffect } from 'react';
// import mergeImages from 'merge-images';

// const OverlayImages = ({ image1, image2, image3 }) => {
//   const [image, setImage] = useState('');

//   useEffect(() => {
//     const overlayImages = async () => {
//       const mergedImage = await mergeImages([image1, image2, image3]);
//       setImage(mergedImage);
//     };
//     overlayImages();
//   }, [image1, image2, image3]);

//   return <img src={image} alt="Overlayed Images" />;
// };

// export default OverlayImages;













import React, { useState } from 'react';
import mergeImages from 'merge-images';

const OverlayImages = () => {
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [mergedImage, setMergedImage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mergedImage = await mergeImages([image1, image2, image3]);
    setMergedImage(mergedImage);
  };

  const handleImage1Change = (event) => {
    if (event.target.files && event.target.files[0]) {
        setImage1(URL.createObjectURL(event.target.files[0]));}
  };

  const handleImage2Change = (event) => {
    if (event.target.files && event.target.files[0]) {
        setImage2(URL.createObjectURL(event.target.files[0]));}
  };

  const handleImage3Change = (event) => {
    if (event.target.files && event.target.files[0]) {
        setImage3(URL.createObjectURL(event.target.files[0]));}
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="image1">Image 1:</label>
          <input type="file" id="image1" onChange={handleImage1Change} />
        </div>
        <div>
          <label htmlFor="image2">Image 2:</label>
          <input type="file" id="image2" onChange={handleImage2Change} />
        </div>
        <div>
          <label htmlFor="image3">Image 3:</label>
          <input type="file" id="image3" onChange={handleImage3Change} />
        </div>
        <button type="submit">Merge Images</button>
      </form>
      {mergedImage && <img src={mergedImage} alt="Merged Images" />}
      {/* <img src={mergedImage} alt="Merged Images" /> */}

    <br/><br/> <br/> <br/>
    <img src={image1} alt="Body" />
    <img src={image2} alt="Eyes" />
    <img src={image3} alt="Mouth" />
    
    </div>
  );
};

export default OverlayImages;
