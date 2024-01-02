import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import Pages from './components/ts/Pages';
import Sidebar from './components/ts/SideBar' 
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Pages/ts/Login';
import Loading from './Pages/ts/Loading';
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
      {isAuthenticated && <Sidebar />}
      <div className='app'>
        {isAuthenticated ? <Pages /> : isLoading ? <Loading /> : <Login />}
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
