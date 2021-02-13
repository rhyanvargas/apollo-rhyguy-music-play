import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core'
import { themeDark, themeMain} from './theme';
import './App.css'


function App() {

  const [theme, setTheme] = useState(true)
 
  const appliedTheme =  createMuiTheme(!theme ? themeDark : themeMain)


  const handleChangeTheme = () =>{
    console.log(themeDark)
    setTheme(!theme);
  };


  return (
    <>
    <MuiThemeProvider theme={appliedTheme} >
      <CssBaseline/>
        <Grid container spacing={3}>
          <Grid  item xs={12}>
            <Header handleChangeTheme={handleChangeTheme} theme={theme}/>
          </Grid>
          <Grid item xs={12} md={7}  >
            <AddSong />
            <SongList />
          </Grid>
          <Grid item xs={12} md={5}>
            <SongPlayer />
          </Grid>
        </Grid>
    </MuiThemeProvider>
    </>
  );
}

export default App;
