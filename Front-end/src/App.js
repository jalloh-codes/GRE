import React from 'react';
import { HeaderMainContainer } from './Components/Header/HeaderMainContainer';
import BodyMainContainer from './Components/Body/BodyMainContainer'
import { FooterMainContainer } from './Components/Footer/FooterMainContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderMainContainer />
      <BodyMainContainer />
      <FooterMainContainer />
    </div>
  );
}

export default App;
