import React from 'react';
import OverlayImages from './OverlayImages';
import Mycomponent from './MyComponent'


const App = () => {
  return (
    <div>
      {/* <Generator/> */}
      <header style={{fontSize: '3rem', padding: '30px', color: '#FFDF2B', fontWeight: 'bold', width: '40%'}}>NFT Generator</header>
      {/* <Mycomponent/> */}
      <OverlayImages/>
    </div>
  );
};

export default App;
