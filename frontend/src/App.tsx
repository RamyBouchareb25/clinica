import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import Pages from './components/js/Pages';
import Sidebar from './components/js/SideBar' 
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Pages/js/Login';
import Loading from './Pages/js/Loading';


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
    </>
  )
}

export default App
