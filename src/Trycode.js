import React, { useState, useRef } from 'react';
import mergeImages from 'merge-images';


const Trycode = () => {
  const [mergedImageURL, setMergedImageURL] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [urlsBody, setUrlsBody] = useState([]);
  const [urlsEyes, setUrlsEyes] = useState([]);
  const [urlsMouth, setUrlsMouth] = useState([]);
  const fileInputRefBody = useRef(null);
  const fileInputRefEyes = useRef(null);
  const fileInputRefMouth = useRef(null);
  // const [img, setImg] = useState([]);

 

  const handleImageUpload = (event, setStateFunction) => {
   

    const imageFiles = event.target.files;
    console.log(imageFiles)
    // setStateFunction(current => [...current, event.target.files]);
    
    setImageCount(imageFiles.length);
    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();
      

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

    const handleDeleteBody= (index) => {
      const newImages = [...urlsBody];
      newImages.splice(index, 1);
      setUrlsBody(newImages);
      fileInputRefBody.current.value = '';
    };

    const handleDeleteEyes= (index) => {
      const newImages = [...urlsEyes];
      newImages.splice(index, 1);
      setUrlsEyes(newImages);
      fileInputRefEyes.current.value = '';
    };

    const handleDeleteMouth= (index) => {
      const newImages = [...urlsMouth];
      newImages.splice(index, 1);
      setUrlsMouth(newImages);
      fileInputRefMouth.current.value = '';
    };

    

  return (
    <div>
      <input type="file" ref={fileInputRefBody} onChange={handleImageUploadBody} multiple />
      <br/>
      <input type="file" ref={fileInputRefEyes} onChange={handleImageUploadEyes} multiple />
      <br/>
      <input type="file" ref={fileInputRefMouth} onChange={handleImageUploadMouth} multiple />
      <br/>

      {/* Input images display */}
      <h1>Body</h1>
      {/* {urlsBody && urlsBody.map((imgSrc, key)=> <><img  key={key} src={imgSrc} alt="Body Image" />
      <button onClick={handledDelete} key={key} >close</button></>
    )} */}

{urlsBody && urlsBody.map((imgSrc, key)=> <img  onClick={(()=>handleDeleteBody(key))} key={key} src={imgSrc} alt="Body Image" /> )}
      <ul>
      {/* {img && img.map((id)=> <li key = {id}>{id.map.name} </li> )} */}
      {/* {img && console.log('hello', img)} */}
      </ul>
      
      <br />
      <h1>Eyes</h1>
      {urlsEyes && urlsEyes.map((imgSrc, key)=> <img onClick={(()=>handleDeleteEyes(key))} key={key} src={imgSrc} alt="Eyes Image" />)}
      <br />
      <h1>Mouth</h1>
      {urlsMouth && urlsMouth.map((imgSrc, key)=> <img onClick={(()=>handleDeleteMouth(key))} key={key} src={imgSrc} alt="Mouth Image" />)}
      <br />

      <button onClick={handleImageMerge}>Merge Images</button>

      
      <br />
      <h1>Merged Images</h1>
      {mergedImageURL && mergedImageURL.map((imgSrc, key)=> <img key={key} src={imgSrc} alt="Merged Image" />)}
      

    </div>
  );
};

export default Trycode;
