import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingPage from './components/Loading';
import RealTimeDataTable from './components/Table'; // Import the modified table component
import Testing from './testing/Testing'

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
        <SocketProvider>
          <Navbar />
          <Routes>
            <Route path="/chart" element={<RealTimeDataTable />} /> Use the modified table component
          </Routes>
          {/* <Testing></Testing> */}
        </SocketProvider>
      )}
    </div>
  );
};

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = new WebSocket('ws://localhost:8080');

  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext };
export { SocketProvider };
export default App;
