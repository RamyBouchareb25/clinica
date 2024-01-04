import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import Pages from './components/ts/Pages';
import Sidebar from './components/ts/SideBar' 
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Pages/ts/LandingPage';
import Loading from './components/ts/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const {isAuthenticated, isLoading} = useAuth0();
  return (
    <>
    <Router>
      <style type="text/css">
        {`
        .app {
          width: ${isAuthenticated ? '82.6vw' : '100vw'};
        }
        body {
          background-color: ${isAuthenticated ? 'white' : '#2B2B2B'};
        }
        `}
      </style>
      {isAuthenticated && <Sidebar />}
      <div className='app'>
        {isAuthenticated ? <Pages /> : isLoading ? <Loading /> : <LandingPage />}
      </div>
    </Router>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
          {/* Same as */}
      <ToastContainer />
    </>
  )
}

export default App
