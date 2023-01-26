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
import { CssBaseline, ThemeProvider } from '@mui/material';
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
          <Switch>
            {/* Public Route */}
              < Route exact path="/" >
                <Home />
              </Route>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            {/* Private Route */}
            <IsAuth>
              <Route path="/search" component={Search} />
              <Route path="/collections">
                <Route exact path="/" component={CollectionPage} />
                <Route path=":id" component={InsideCollection} />
                <Route path="new" component={NewCollectionForm} />
              </Route>
            </IsAuth>
            {/* Utils Route  */}
            <Route path="/about" component={About} />
            <Route path="/error" component={Error} />
            <Route component={Error} />
          </Switch>
        </Router>
    </ThemeProvider>
  );
}



