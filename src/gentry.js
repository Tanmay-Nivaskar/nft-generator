import React, { useState } from 'react';
import mergeImages from 'merge-images';

const MyComponent = () => {
  const [mergedImageURLs, setMergedImageURLs] = useState([]);
  const [imageCounts, setImageCounts] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [urlSets, setUrlSets] = useState([[]]);

  const handleAddSet = () => {
    setUrlSets((prevSets) => [...prevSets, []]);
  };

  const handleRemoveSet = (index) => {
    setUrlSets((prevSets) => {
      const newSets = [...prevSets];
      newSets.splice(index, 1);
      return newSets;
    });
  };

  const handleImageUpload = (event, setIndex) => {
    const imageFiles = event.target.files;
    setImageCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[setIndex] = imageFiles.length;
      return newCounts;
    });

    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        newUrls.push(e.target.result);

        if (newUrls.length === imageFiles.length) {
          setUrlSets((prevSets) => {
            const newSets = [...prevSets];
            newSets[setIndex] = newUrls;
            return newSets;
          });

          const allSetsUploaded = urlSets.every((set) => set.length > 0);

          if (allSetsUploaded) {
            setUploadComplete(true);
          }
        }
      };

      fileReader.readAsDataURL(imageFiles[i]);
    }
  };

  const handleImageMerge = async () => {
    const newMergedImageURLs = [];

    for (let i = 0; i < urlSets.length; i++) {
      const mergedImage = await mergeImages(...urlSets[i]);
      newMergedImageURLs.push(mergedImage);
    }

    setMergedImageURLs(newMergedImageURLs);
  };

  return (
    <div>
      <button onClick={handleAddSet}>Add Image Set</button>
      <br />
      <br />
      {urlSets.map((set, index) => (
        <div key={index}>
          <input type="file" onChange={(e) => handleImageUpload(e, index)} multiple />
          <button onClick={() => handleRemoveSet(index)}>Remove Set</button>
          <br />
        </div>
      ))}
      <br />
      <button onClick={handleImageMerge}>Merge Images</button>
      <br />
      <br />
      {mergedImageURLs.map((url, index) => (
        <img key={index} src={url} alt={`Merged Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default MyComponent;
