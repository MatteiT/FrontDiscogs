import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './utils/Banner';
import Nav from './components/Nav';
import Home from './components/Home';
import Search from './components/Search';
import About from './utils/About';
import Error from './utils/Error';
import Register from './features/auth/Register';
import CollectionPage from './components/CollectionPage';
import { CssBaseline, Switch, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme/theme';
import Login from './features/auth/Login';
import NewCollectionForm from './features/collection/NewCollectionForm';
import InsideCollection from './features/collection/InsideCollection';
import IsAuth from './features/auth/IsAuth';

export default function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          {/* Header */}
          <Banner />
          <Nav />
            <Routes>
              {/* Public Route */}
                < Route path="/" >
                  <Route index path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
                {/* Private Route */}
                <Route path="/search" element={<IsAuth><Search /></IsAuth>} />
                <Route path="/collections">
                  <Route index element={<IsAuth><CollectionPage /></IsAuth>} />
                  <Route path=":id" element={<IsAuth><InsideCollection /></IsAuth>} />
                  <Route path="new" element={<IsAuth><NewCollectionForm /></IsAuth>} />
                </Route>
                {/* Utils Route  */}
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Error />} />
            </Routes>
          </Router>
    </ThemeProvider>
      );
    }
    



