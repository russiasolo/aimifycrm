import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import {createTheme,ThemeProvider} from '@mui/material'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Product from "./Pages/product";
import Dashboard from "./Pages/Dashboard";


const theme = createTheme({
  direction:"rtl",
})


function App() {
  
  useEffect(()=>{
    const lang = Cookies.get("i18next") || "en";
    if(lang==="ar"){
      document.body.dir="rtl"
    }
    else{
      document.body.dir="ltr"
    }
  },[])

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="home" element={<Dashboard /> } />
					<Route path="product" element={<Product /> } />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
