import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import { Badge, FormControl, Input, Stack } from '@mui/material';

const drawerWidth = 240;

function Home(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navbarstyle = {
    bgcolor: 'white',
    color: 'black',
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={navbarstyle}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction='row' width='100%' justifyContent='space-between' spacing={3}>
            <Typography variant='h6' noWrap component='div'>
              <FormControl variant='standard'>
                <Input startdecorator={<MailIcon />} enddecorator={<Button>Message</Button>} />
              </FormControl>
            </Typography>
            <Typography variant='p' noWrap component='div'>
              <Button sx={{ mr: 0 }} variant='text'>
                {' '}
              </Button>
              <Button sx={{ mr: 0 }} variant='text' className='btn'>
                {' '}
                <Badge badgeContent={4} color='secondary'>
                  <MailIcon color='action' />
                </Badge>{' '}
              </Button>
              <Button
                sx={{ mr: 0 }}
                id='basic-button'
                className='btn'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <PersonIcon />
              </Button>

              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={handleClose}>Настройки</MenuItem>
                <MenuItem onClick={handleClose}>Выйти</MenuItem>
              </Menu>
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <SideBar />{' '}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            borderLeft: '1px solid #0000001f',
          }}
          open
        >
          <SideBar />{' '}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default Home;
