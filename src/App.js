import React, { useState } from 'react';
import './App.css';
import Progress from './Progress';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Main from './Main';

function App() {
    return (
      <Router>   
          <Routes>
            <Route path='/progress'
                  element={<Progress />}/>
            <Route path='/'
                  element={<Main />}/>
          </Routes>
      </Router>
    )
}

export default App;

