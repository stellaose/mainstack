import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import 'animate.css';

import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Landing/>
    </div>
  );
}

export default App;
