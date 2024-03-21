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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/update-account' element={<Update/>} />
            <Route path='/view-account' element={<View/>} />
            <Route path='/appointments' element={<Appointments/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
