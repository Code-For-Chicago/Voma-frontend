import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AssignmentBoard from '../pages/AssignmentBoard';
import Projects from '../pages/Projects';
import PageNotFound from '../pages/PageNotFound';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Admin from '../pages/Admin';
import StyleTest from './StyleTest';

import { VolunteerProvider } from '../lib/VolunteerProvider';
import { LockedRoute } from '../lib/AuthProvider';

function App() {

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Switch>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>

        {/* Logged In */}
        <LockedRoute path="/dashboard">
          <Header />
          <Dashboard />
        </LockedRoute>
        <LockedRoute path="/board">
          <Header />
          <AssignmentBoard />
        </LockedRoute>
        <LockedRoute path="/admin">
            <Header />
            <Admin />
        </LockedRoute>
        <Route path="/projects">
          <Header />
          <Projects />
        </Route>
        
        {/* Test Page for design system development */}
        <Route path="/style-test">
          <StyleTest />
        </Route>

        {/* Registration Form */}
        <VolunteerProvider>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
        </VolunteerProvider>


        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
