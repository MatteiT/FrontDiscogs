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
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme/theme';
import Login from './features/auth/Login';
import CollectionList from './features/collection/CollectionList';
import NewCollectionForm from './features/collection/NewCollectionForm';
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
              <Route path="/search" element={<Search />} />
            </Route>

            {/* Private Route */}
            
            <Route path="/collections">
              <Route index element={< CollectionPage />} />
              <Route path=":id" element={<CollectionList />} />
              <Route path="new" element={<NewCollectionForm />} />
            </Route>
            

            {/* Utils Route  */}
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
        </Routes>
        {/* Footer */}
      </Router>
</ThemeProvider>
  );
}



