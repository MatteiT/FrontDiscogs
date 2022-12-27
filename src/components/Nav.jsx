import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
} from '@mui/material';
import { Switch} from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { setMode} from '../features/app/themeSlice';
import LogOut from '../features/auth/LogOut';


const Nav = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.userId);
  
  return (
<>
  <AppBar position="static" color="primary" sx={{ mb: 2, boxShadow: 3 }}>
    <Toolbar variant="dense">
        {user && (
            <Grid container  direction="row" justifyContent='space-evenly' alignItems='center '>
                    <Button color="inherit" component={NavLink} to="/home">
                    Home
                    </Button>
                    <Button color="inherit" component={NavLink} to="/collections">
                    Collections
                    </Button>
                    <Button color="inherit" component={NavLink} to="/search">
                    Search
                    </Button>
                    <Button color="inherit" component={NavLink} to="/about">
                    About
                    </Button>
                    <Box sx={{ display: 'flex', alignItems:'flex-end', alignContent:'center', ml: 1 }}>
                    <LogOut />
                    <Switch
                      onChange={() => dispatch(setMode())}
                      label="Toggle Theme"
                      icon={<Brightness4Icon />}
                      checkedIcon={<ModeNightIcon />}
                    />
                  </Box>
            </Grid>
        )}
    </Toolbar>
</AppBar>
</>
  );
};

export default Nav;
