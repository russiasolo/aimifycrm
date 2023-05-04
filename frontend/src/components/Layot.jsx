import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

function Layot() {
  return (
    <div className='header'>
    <Sidebar />
    <div className='headerContainer'><Header /></div>
  </div>
  )
}

export default Layot