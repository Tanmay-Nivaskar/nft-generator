import React from 'react';
import OverlayImages from './OverlayImages';
import body from './images/body.png'
import eyes from './images/eyes.png'
import mouth from './images/mouth.png'
import MyComponent from './MyComponent'
import Try from './Trycode'

const App = () => {
  return (
    <div>
      {/* <OverlayImages
        image1={body}
        image2={eyes}
        image3={mouth}
      /> */}
      {/* <OverlayImages/> */}
      <Try/>
    </div>
  );
};

export default App;
