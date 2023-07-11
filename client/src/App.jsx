import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingPage from './components/Loading';
<<<<<<< HEAD
import LineChart from './components/Chart/LineChart'
=======
import ConfigForm from './components/Testing/ConfigForm'

>>>>>>> c1c88e1223f47a41c13e21bd15aa629670818202

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
<<<<<<< HEAD
          <Navbar />
          {/* <LineChart /> */}
=======
          {/* <Navbar /> */}
          {/* <MainComponent/> */}
          {/* <Filter/> */}
          <ConfigForm></ConfigForm>
>>>>>>> c1c88e1223f47a41c13e21bd15aa629670818202
        </div>
      )}
    </div>
  );
};

export default App;
