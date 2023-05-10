import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import Product from './Pages/product';
import Dashboard from './Pages/Dashboard';
import Students from './Pages/Students';

const theme = createTheme({
  direction: 'rtl',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='home' element={<Dashboard />} />
          <Route path='product' element={<Product />} />
          <Route path='students' element={<Students />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
