import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Update from './components/Update';
import View from './components/View';
import Appointments from './components/Appointments';
import BookAppointment from './components/BookApoointment';
import AllDoctors from './components/AllDoctors';
import AllClients from './components/AllClients';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            {/* <Route element={<Home />} /> */}
            <Route index element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/update-account' element={<Update/>} />
            <Route path='/view-account' element={<View/>} />
            <Route path='/appointments' element={<Appointments/>} />
            <Route path='/book-appointment' element={<BookAppointment/>} />
            <Route path='/all-doctors' element={<AllDoctors/>} />
            <Route path='/all-clients' element={<AllClients/>} />
            <Route path='/book-appointment' element={<BookAppointment/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
