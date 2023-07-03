import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingPage from './components/Loading';
import RealTimeDataTable from './components/Table';

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
          <Navbar />
          <Routes>
            <Route path="/chart" element={<RealTimeDataTable />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
