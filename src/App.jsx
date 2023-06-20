import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router-dom';
import LoadingPage from './components/Loading';
import { useState, useEffect } from 'react';

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
        <Navbar></Navbar>
      )}
    </div>
  );
};

export default App;
