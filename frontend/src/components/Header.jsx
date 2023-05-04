import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DarkModeOutlineIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header() {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Найти...' />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlineIcon />
          </div>
          <div className="item">
            <div className='counter'>1</div>
            <NotificationsNoneOutlinedIcon />
          </div>
          <div className="item">
            <AccountCircleIcon/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header