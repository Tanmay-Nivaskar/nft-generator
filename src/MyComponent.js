import React, { useState, useRef, useEffect } from "react";
import mergeImages from "merge-images";
import Style from "./OverlayImages.module.css";

const useDynamicUrlState = () => {
  const [urlStates, setUrlStates] = useState([]);
  const [probabilities, setProbabilities] = useState([]);

  const fileInputRef = useRef(null);

  const handleImageUpload = (event, index) => {
    const imageFiles = event.target.files;
    const newUrls = [];
    const newProbabilities = [];

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
      };

      fileReader.readAsDataURL(imageFiles[i]);
    }

    const defaultProbability = 1 / imageFiles.length;
    for (let i = 0; i < imageFiles.length; i++) {
      newProbabilities.push(defaultProbability);
    }

    setProbabilities((prevProbabilities) => {
      const updatedProbabilities = [...prevProbabilities];
      updatedProbabilities[index] = newProbabilities;

      return updatedProbabilities;
    });
  };

  const handleProbabilityChange = (index, imageIndex, probability) => {
    setProbabilities((prev) => {
      prev[index][imageIndex] = probability;
      return prev;
    });
    // setProbabilities((prevProbabilities) => {
    //   const updatedProbabilities = [...prevProbabilities];
    //   const probabilities = [...updatedProbabilities[index]];
    //   probabilities[imageIndex] = probability;
    //   updatedProbabilities[index] = probabilities;
    //   return updatedProbabilities;
    // });
  };

  return [
    urlStates,
    setUrlStates,
    probabilities,
    handleImageUpload,
    handleProbabilityChange,
    fileInputRef,
  ];
};

const Trycode = () => {
  const [mergedImageURL, setMergedImageURL] = useState([]);
  const [
    urlStates,
    setUrlStates,
    probabilities,
    handleImageUpload,
    handleProbabilityChange,
    fileInputRef,
  ] = useDynamicUrlState();
  const [stateNames, setStateNames] = useState([""]);
  const [imagesMerged, setImagesMerged] = useState(false);
  const [imgidk, setImgidk] = useState([]);
  const [crossImage, setCrossImage] = useState([]);

  useEffect(() => {
    if (mergedImageURL.length > 0) {
      setImagesMerged(true);
    } else {
      setImagesMerged(false);
    }
  }, [mergedImageURL]);

  function handleDownloadImages() {
    console.log("clicks");
  }

  const handleImageMerge = async () => {
    console.log({ probabilities });
    // handleClearState();

    console.log("hello2");
    const mergeCombinations = cartesianProduct(urlStates);
    const crossProbability = cartesianProduct(probabilities);
    console.log({ crossProbability });

    const mergedImages = [];
    console.log(mergeCombinations);
    var j = 0;
    for (const combination of mergeCombinations) {
      let mergedImage = null;
      let probability = 1;

      for (let i = 0; i < combination.length; i++) {
        const image = combination[i];
        const imageProbability = crossProbability[j][i];

        let randomvalue = Math.random();
        console.log({ imageProbability });
        console.log({ randomvalue });
        if (randomvalue < imageProbability) {
          setCrossImage((current) => [...current, image]);
          // setImgidk((current) => [...current, image]);
          // setImgidk(["", ""])
          console.log({ crossImage });
          // setMergedImageURL((current) => [...current, mergedImage]);
          probability *= imageProbability;

          //
          //   setMergedImageURL((current) => [...current, mergedImage]);
        }
      }

      console.log({ imgidk });
      mergedImage = await mergeImages(imgidk);
      if (mergedImage !== null) {
        mergedImages.push({ src: mergedImage, probability });
      }

      setImgidk([]);
      j++;
    }

    setMergedImageURL(mergedImages);
  };

  const handleClearState = () => {
    setMergedImageURL([]);
    setUrlStates([]);
    // setProbabilities([]);
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
    setStateNames((prevNames) => [...prevNames, ""]);
  };

  const handleDelete = (index, imageIndex) => {
    setUrlStates((prevUrlStates) => {
      const updatedStates = [...prevUrlStates];
      const images = [...updatedStates[index]];
      images.splice(imageIndex, 1);
      updatedStates[index] = images;
      return updatedStates;
    });

    // setProbabilities((prevProbabilities) => {
    //   const updatedProbabilities = [...prevProbabilities];
    //   const probabilities = [...updatedProbabilities[index]];
    //   probabilities.splice(imageIndex, 1);
    //   updatedProbabilities[index] = probabilities;
    //   return updatedProbabilities;
    // });
  };

  const handleInputChange = (index, value) => {
    setStateNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const handleProbabilityInputChange = (index, imageIndex, e) => {
    console.log({ index, imageIndex, value: e.target.value });
    const probability = parseFloat(e.target.value);
    if (!isNaN(probability) && probability >= 0 && probability <= 1) {
      handleProbabilityChange(index, imageIndex, probability);
    }
  };

  const cartesianProduct = (arrays) => {
    console.log("in car");
    return arrays.reduce(
      (acc, array) => acc.flatMap((x) => array.map((y) => [...x, y])),
      [[]]
    );
  };

  return (
    <div className={Style.container}>
      <div>
        <div className={Style.layer_input}>
          <form onSubmit={handleAddStates}>
            <input
              className={Style.layer_name_input}
              type="text"
              placeholder="Layer Name"
              required
              value={stateNames[stateNames.length - 1]}
              onChange={(e) =>
                handleInputChange(stateNames.length - 1, e.target.value)
              }
            />
            <input className={Style.submitbtn} type="submit" value="+Add" />
          </form>
        </div>
        <br />
        <br />

        {urlStates.map((urlState, index) => (
          <div key={index}>
            <div className={Style.layer}>
              <p style={{ color: "#FFDF2B" }}>{stateNames[index]}</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(event) => handleImageUpload(event, index)}
                multiple
              />
              <button onClick={() => handleRemoveStates(index)}>Remove</button>
              <div className={Style.upload_image_container}>
                {urlState.map((imgSrc, key) => (
                  <div key={key} className={Style.image_probability}>
                    <img
                      className={Style.upload_image}
                      onClick={() => handleDelete(index, key)}
                      src={imgSrc}
                      alt={`Image ${key}`}
                    />
                    <input
                      type="text"
                      className={Style.image_probability_input}
                      value={probabilities[index][key]}
                      onChange={(e) => {
                        handleProbabilityInputChange(index, key, e);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <br />
          </div>
        ))}

        <div className={Style.mergebtn}>
          <button onClick={handleImageMerge}>Merge Images</button>
          <button onClick={handleClearState}>Clear</button>
          <button onClick={handleDownloadImages}>Download</button>
        </div>
      </div>

      <div className={Style.displayMergedImg}>
        {imagesMerged && <h1>Merged Images</h1>}
        {mergedImageURL.map((image, key) => (
          <div key={key}>
            <img
              className={Style.merged_images}
              src={image.src}
              alt={`Merged Image ${key}`}
            />
            <p>Probability: {image.probability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trycode;
