import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './Components/Layout/Landing';
import LoginTest from './Components/Utils/LoginTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/LoginTest" element={<LoginTest />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
