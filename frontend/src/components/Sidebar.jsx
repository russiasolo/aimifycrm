import React from 'react'

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>AimifyCRM</span>
      </div>
      <hr />
      <div className='center'>
        <p className="SidZag">Main</p>
        <ul><li><SpaceDashboardIcon className='icon' /><span>Рабочий стол</span></li></ul>
        <ul><li><CalendarMonthIcon className='icon' /> <span>Расписание уроков</span></li></ul>
        <ul><li><Groups2Icon className='icon'/><span>Ученики</span></li></ul>
        <ul><li><PersonAddAltIcon className='icon'/><span>Лиды</span></li></ul>
        <p className="SidZag">Service</p>
        <ul><li><SettingsSuggestIcon className='icon'/><span>Настройки</span></li></ul>
        </div>
      <div className='bottom'>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar