import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router-dom';

function App() {
  return (
    <>
    {/* <Routes>
      <Route path="/" Component={Navbar} />
    </Routes> */}
      <Navbar></Navbar>
      {/* <Chart></Chart> */}
      {/* <div className='graph-container flex'>
                    <BoxSx>
                        <Chart />
                    </BoxSx>
                    <BoxSx>

                    </BoxSx>
                </div> */}
      {/* <div className='graph-container flex'>
      </div> */}
    </>
  );
}

export default App;
