import React, { useState, useEffect ,createContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingPage from './components/Loading';
import LineChart from './components/Chart/LineChart';
import PDFGenerator from './components/Routing/PDFGenerator';

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
          {/* <PDFGenerator/> */}
        </SocketProvider>
      )}
    </div>
  );
};

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message Received");
      // const data = JSON.parse(event.data);
      // console.log(data)
      // updateChartData(data);
    });

    // socket.addEventListener("close", () => {
    //   console.log("WebSocket connection closed");
    // });

    // return () => {
    //   socket.close();
    // };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext };
export default App;