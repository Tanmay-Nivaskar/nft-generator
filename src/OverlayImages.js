import React, { useState, useRef } from 'react';
import mergeImages from 'merge-images';

const useDynamicUrlState = () => {
  const [urlStates, setUrlStates] = useState([]);
  const fileInputRef = useRef(null);

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

  return [urlStates, setUrlStates, fileInputRef, handleImageUpload];
};

const Trycode = () => {
  const [mergedImageURL, setMergedImageURL] = useState([]);
  const [urlStates, setUrlStates, fileInputRef, handleImageUpload] = useDynamicUrlState();
  const [stateNames, setStateNames] = useState([""]);

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
    // setUrlStates([]);
  };

  const handleRemoveStates = (index) => {
    setUrlStates((prevUrlStates) => {
      const updatedStates = [...prevUrlStates];
      updatedStates.splice(index, 1);
      return updatedStates;
    });
    setStateNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  const handleAddStates = (event) => {
    event.preventDefault();
    setUrlStates((prevUrlStates) => [...prevUrlStates, []]);
    setStateNames((prevNames) => [...prevNames, '']);
  };

  const handleDelete = (index, imageIndex) => {
    setUrlStates((prevUrlStates) => {
      const updatedStates = [...prevUrlStates];
      const images = [...updatedStates[index]];
      images.splice(imageIndex, 1);
      updatedStates[index] = images;
      return updatedStates;
    });
  };

  const handleInputChange = (index, value) => {
    console.log('in setname function')
    setStateNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
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
      <form onSubmit={handleAddStates}>
        <label>Name : </label>
        <input type="text" value={stateNames[stateNames.length - 1]} onChange={(e) => handleInputChange(stateNames.length - 1, e.target.value)} />
        <input type="submit" value="Add" />
      </form>

      {urlStates.map((urlState, index) => (
        <div key={index}>
          <h1>{stateNames[index] || `Field ${index + 1}`}</h1>

          <input type="file" ref={fileInputRef} onChange={(event) => handleImageUpload(event, index)} multiple />
          <button onClick={() => handleRemoveStates(index)}>Remove</button>
          <br />
          {urlState.map((imgSrc, key) => (
            <img onClick={() => handleDelete(index, key)} key={key} src={imgSrc} alt={`Image ${key}`} />
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
