import React, { useState } from 'react';
import mergeImages from 'merge-images';

const useDynamicUrlState = (fieldCount) => {
  const [urlStates, setUrlStates] = useState(
    Array.from({ length: fieldCount }, () => [])
  );

  const handleImageUpload = (event, index) => {
    const imageFiles = event.target.files;
    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const imageUrl = e.target.result;

        setUrlStates((prevUrlStates) => {
          const updatedStates = [...prevUrlStates];
          updatedStates[index] = [...updatedStates[index], imageUrl];
          return updatedStates;
        });

        newUrls.push(imageUrl);

        if (newUrls.length === imageFiles.length) {
          setUrlStates((prevUrlStates) => {
            const updatedStates = [...prevUrlStates];
            updatedStates[index] = newUrls;
            return updatedStates;
          });
        }
      };

      fileReader.readAsDataURL(imageFiles[i]);
    }
  };

  return [urlStates, setUrlStates, handleImageUpload];
};

const Trycode = () => {
  const [mergedImageURL, setMergedImageURL] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [img, setImg] = useState([]);

  const [urlStates, setUrlStates, handleImageUpload] = useDynamicUrlState(5); // Adjust the fieldCount as needed

  const handleImageMerge = async () => {
    handleClearState();

    const mergeCombinations = cartesianProduct(urlStates);

    for (const combination of mergeCombinations) {
      const mergedImage = await mergeImages(combination);
      setMergedImageURL((current) => [...current, mergedImage]);
    }
  };

  const handleClearState = () => {
    setMergedImageURL([]);
    setImg([]);
    urlStates.forEach((_, index) => {
      setUrlStates((prevUrlStates) => {
        const updatedStates = [...prevUrlStates];
        updatedStates[index] = [];
        return updatedStates;
      });
    });
  };

  const cartesianProduct = (arrays) => {
    return arrays.reduce(
      (acc, array) =>
        acc.flatMap((x) => array.map((y) => [...x, y])),
      [[]]
    );
  };

  return (
    <div>
      {urlStates.map((urlState, index) => (
        <div key={index}>
          
          <h1>Field {index + 1}</h1>
          <input
            type="file"
            onChange={(event) => handleImageUpload(event, index)}
            multiple
          />
          <br />
          {urlState.map((imgSrc, key) => (
            <img key={key} src={imgSrc} alt={`Image ${key}`} />
          ))}
          <br />
        </div>
      ))}

      <button onClick={handleImageMerge}>Merge Images</button>

      <button onClick={handleClearState}>Clear</button>
      <br />
      <h1>Merged Images</h1>
      {mergedImageURL.map((imgSrc, key) => (
        <img key={key} src={imgSrc} alt={`Merged Image ${key}`} />
      ))}
    </div>
  );
};

export default Trycode;
