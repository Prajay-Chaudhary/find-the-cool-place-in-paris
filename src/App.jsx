import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';

// Main component for the application
const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
};

export default App;
