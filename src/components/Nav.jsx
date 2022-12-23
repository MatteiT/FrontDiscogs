import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
} from '@mui/material';
import { Switch} from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { setMode} from '../features/app/themeSlice';
import LogOut from '../features/auth/LogOut';
import { Block } from '@mui/icons-material';


const Nav = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
          <AppBar position="static">
            <Toolbar>
              <Grid container spacing={2} alignContent="center" justifyContent="center" direction="row">
              {!user ? ( 
                <Box 
                variant='outline'
                sx={{ flexGrow: 1 }}
                style={{
                  // make an infinite animation that fades in and out
                  animation: 'fade-in-out 1s ease-in-out infinite alternate',
                  color: mode === 'dark' ? 'white' : 'black',
                }}
                >
                     You have to be logged in to use this app.
                   </Box>

              ) : (
            <Grid container spacing={2} alignContent="center" justifyContent="center" direction="row">
              <Box variant='outline'sx={{ flexGrow: 1 }}>
                <NavLink to="/">Home</NavLink>
              </Box>
              <Box variant='outline' sx={{ flexGrow: 1 }}>
                <NavLink to="/login">Login</NavLink>
              </Box>
              <Box variant='outline' sx={{ flexGrow: 1 }}>
                <NavLink to="/search">Search</NavLink>
              </Box>
              <Box variant='outline' sx={{ flexGrow: 1 }}>
                <NavLink to="/collections">Collections</NavLink>
              </Box>
              <Box variant='outline' sx={{ flexGrow: 1 }}>
                <NavLink to="/about">About</NavLink>
              </Box>
              <Box variant='outline' sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignContent="center" justifyContent="center" direction="row">
                <LogOut />
              <Switch
                onChange={() => dispatch(setMode())}
                label="Toggle Theme"
                icon={<Brightness4Icon />}
                checkedIcon={<ModeNightIcon />}
              />
              </Grid>
              </Box>
            </Grid>
              )}
              </Grid>
            </Toolbar>
          </AppBar>   
      </>
  );
};

export default Nav;
