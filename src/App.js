import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import './App.css';
import Tabs from './Tabs';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Countdown
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs/>
    </div>
  );
}

export default App;
