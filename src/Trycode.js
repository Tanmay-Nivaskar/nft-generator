import React, { useState } from 'react';
import mergeImages from 'merge-images';

const Trycode = () => {
  const [mergedImageURL, setMergedImageURL] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [urlsBody, setUrlsBody] = useState([]);
  const [urlsEyes, setUrlsEyes] = useState([]);
  const [urlsMouth, setUrlsMouth] = useState([]);
  const [img, setImg] = useState([]);

 

  const handleImageUpload = (event, setStateFunction) => {
    const imageFiles = event.target.files;
    console.log(imageFiles)
    setStateFunction(current => [...current, event.target.files]);
    
    setImageCount(imageFiles.length);
    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();
      // console.log(fileReader)

      fileReader.onload = (e) => {
        setStateFunction(current => [...current, e.target.result]);

        if (newUrls.length === imageFiles.length) {
          setStateFunction([...newUrls]);
          setUploadComplete(true);
        }
      };

      fileReader.readAsDataURL(imageFiles[i]);
    }
  };

  const handleImageUploadBody = (event) => {
    handleImageUpload(event, setUrlsBody);
  };

  const handleImageUploadEyes = (event) => {
    handleImageUpload(event, setUrlsEyes);
  };

  const handleImageUploadMouth = (event) => {
    handleImageUpload(event, setUrlsMouth);
  };

  const handleImageMerge = async () => {
    handleClearState();
  
   
    
      for (let i = 0; i < urlsBody.length; i++) {
        
        for (let j = 0; j < urlsEyes.length; j++) {
        
          for (let k = 0; k < urlsMouth.length; k++) {
            
           
        const mergedImage = await mergeImages([
          urlsBody[i],
          urlsEyes[j],
          urlsMouth[k]
        ]);

      // mergedImages.push(mergedImage);
      setMergedImageURL(current => [...current, mergedImage]);
      
      // htmlLines.push(htmlLine);
      
      // mergedImages(current => [...current, mergedImage]);
    }}}

    
    
  };

  const handleClearState = (event) => {
      setMergedImageURL('');
      // setUrlsBody('')
      // setUrlsEyes('')
      // setUrlsMouth('')
    }

  return (
    <div>
      <input type="file" onChange={handleImageUploadBody} multiple />
      <br/>
      <input type="file" onChange={handleImageUploadEyes} multiple />
      <br/>
      <input type="file" onChange={handleImageUploadMouth} multiple />
      <br/>

      {/* Input images display */}
      <h1>Body</h1>
      {urlsBody && urlsBody.map((imgSrc, key)=> <img key={key} src={imgSrc} alt="Body Image" />)}
      <ul>
      {img && img.map((id)=> <li key = {id}>{id.map.name} </li> )}
      {img && console.log('hello', img)}
      </ul>
      
      <br />
      <h1>Eyes</h1>
      {urlsEyes && urlsEyes.map((imgSrc, key)=> <img key={key} src={imgSrc} alt="Eyes Image" />)}
      <br />
      <h1>Mouth</h1>
      {urlsMouth && urlsMouth.map((imgSrc, key)=> <img key={key} src={imgSrc} alt="Mouth Image" />)}
      <br />

      <button onClick={handleImageMerge}>Merge Images</button>

      {/* <img src={mergedImageURL[0]} alt="Merged Image" /> */}
       {/* <img src={mergedImageURL[1]} alt="Merged Image" /> */}
      {/* <img src={mergedImageURL[2]} alt="Merged Image" /> */}
      {/* <img src={mergedImageURL[3]} alt="Merged Image" /> */} 
      <button onClick={handleClearState}>Clear</button>
      <br />
      <h1>Merged Images</h1>
      {mergedImageURL && mergedImageURL.map((imgSrc, key)=> <img key={key} src={imgSrc} alt="Merged Image" />)}
    </div>
  );
};

export default Trycode;
