import {Routes, Route,useLocation} from 'react-router-dom';
import Home from '../../Pages/ts/Home';
import Patients from '../../Pages/ts/Patients';
import Logout from '../../Pages/ts/Logout';

export default function Pages() {
const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/logout' element={<Logout />} />
    </Routes>
  )
}
