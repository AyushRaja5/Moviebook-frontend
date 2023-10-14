import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bookings from './pages/bookings/Bookings';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Allmovies from './pages/allmovies/Allmovies';
import Admin from './pages/login/Admin';
import Booking from './components/Booking/Booking';
import Addmovie from './pages/addmovie/Addmovie';
import Myuploads from './pages/myuploads/Myuploads';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allmovies' element={<Allmovies/>} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin/>}  />
          <Route path='/addmovie' element={<Addmovie/>}  />
          <Route path='/uploadedmovie' element={<Myuploads/>} />
          <Route path='/booking/:id' element={<Booking/>}  />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
