import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingPage from './components/Loading';
import ConfigForm from './components/Testing/ConfigForm'


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {/* <Navbar /> */}
          {/* <MainComponent/> */}
          {/* <Filter/> */}
          <ConfigForm></ConfigForm>
        </div>
      )}
    </div>
  );
};

export default App;
