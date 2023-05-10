import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import './Layout.css';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { NavLink } from 'react-router-dom';
import React from 'react';

const topics = [
  {
    title: 'Рабочий стол',
    icon: HomeOutlinedIcon,
    link: 'home',
  },
  {
    title: 'Ученики',
    icon: GroupsIcon,
    link: 'students',
  },
  {
    title: 'Расписание',
    icon: QrCodeOutlinedIcon,
    link: '',
  },
  {
    title: 'Статистика',
    icon: BarChartOutlinedIcon,
    link: '',
  },
  {
    title: 'Лиды',
    icon: CreditCardOutlinedIcon,
    link: '',
  },
  {
    title: 'Настройки',
    icon: ProductionQuantityLimitsIcon,
    link: '',
  },
];

function SideBar() {
  return (
    <div>
      <div>
        <Toolbar>
          <Typography className='Logo' variant='h4'>
            AimifyCRM
          </Typography>
        </Toolbar>

        <List className='routing'>
          {topics.map((item, index) => (
            <NavLink to={`/${item.link}`} key={item.title + index + 'nav'}>
              <ListItem key={item.title + index + 'o'} disablePadding>
                <ListItemButton>
                  <ListItemIcon className='icon-theme'>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ textAlign: 'start' }} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    </div>
  );
}

export default SideBar;
