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
import ScrollToTop from "react-scroll-to-top";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from 'react';


function App() {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#Home', popover: { title: 'This is the home', description: 'Here you see insights about your Clinc.', side: "left", align: 'start' }},
      { element: '#patients', popover: { title: 'Import the Library', description: 'It works the same in vanilla JavaScript as well as frameworks.', side: "bottom", align: 'start' }},
      { element: '#Doctors', popover: { title: 'Importing CSS', description: 'Import the CSS which gives you the default styling for popover and overlay.', side: "bottom", align: 'start' }},
      { element: '#Calendar', popover: { title: 'Create Driver', description: 'Simply call the driver function to create a driver.js instance', side: "left", align: 'start' }},
      { element: '#Rendez-Vous', popover: { title: 'Start Tour', description: 'Call the drive method to start the tour and your tour will be started.', side: "top", align: 'start' }},
      { element: '#Settings', popover: { title: 'More Configuration', description: 'Look at this page for all the configuration options you can pass.', side: "right", align: 'start' }},
      { popover: { title: 'Happy Coding', description: 'And that is all, go ahead and start adding tours to your applications.' } }
    ]
  });
  const {isAuthenticated, isLoading} = useAuth0();
  useEffect(() => {
    if (!isLoading) {
      // uncomment this line to show the tour
      // driverObj.drive();
    }
  }, [driverObj, isLoading]);  
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
      <ScrollToTop smooth />
    </>
  )
}

export default App
