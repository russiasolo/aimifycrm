import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard'
import Login from './pages/Login';


import './styles/custom.scss';
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer';

function App() {
  return (
  <div className='header'>
    <Sidebar />
    <div className='headerContainer'><Header /></div>
    <div className='footer'><Footer /></div>
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
