import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import React, { useState, createContext, useReducer, useContext } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { createMuiTheme, makeStyles, useTheme } from "@material-ui/core/styles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { themeDark, themeMain } from "./theme";
import "./App.css";
import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";
import songReducer from './reducer'


export const SongContext = createContext({
	song: {
		id: "03a3433f-9c0e-433a-a12a-dc0af15d6eae",
		artist: "joji",
		thumbnail: "http://img.youtube.com/vi/sADmwWhU5ZM/0.jpg",
		title: "WORLD$TAR MONEY",
		duration: 197,
	}
})

function App() {

	const initialSongState = useContext(SongContext);
	const [state, dispatch] = useReducer(songReducer, initialSongState)

	const [theme, setTheme] = useState(true);

	const appliedTheme = createMuiTheme(!theme ? themeDark : themeMain);

	const myTheme = useTheme();

	const isLessThanSmBreakpoint = useMediaQuery(myTheme.breakpoints.down("sm"));

	const useStyles = makeStyles({
    header: {

    },
		gridFixed: isLessThanSmBreakpoint
			? {
					position: "fixed",
					bottom: 0,
					width: "100%",
			  }
			: {
					position: "fixed",
					right: 0,
					width: "100%",
					top: 70,
			  },
	});

	const classes = useStyles();

	const handleChangeTheme = () => {
		setTheme(!theme);
	};

	//check for Navigation Timing API support
	if (window.performance) {
		console.info("window.performance works fine on this browser");
	}
	console.info(performance.navigation.type);
	if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
		console.info( "This page is reloaded" );
	} else {
		console.info( "This page is not reloaded");
	}

	return (
		<>
		<SongContext.Provider value={{state, dispatch}}>
			<MuiThemeProvider theme={appliedTheme}>
				<CssBaseline />
				<Grid container >
					<Hidden only="xs">
						<Grid item xs={12}>
							<Header className={classes.header} handleChangeTheme={handleChangeTheme} theme={theme} />
						</Grid>
					</Hidden>
					<Grid item xs={12} md={6}>
						<AddSong />
						<SongList />
					</Grid>
					<Grid className={classes.gridFixed} item xs={12} md={5}>
						<SongPlayer />
					</Grid>
				</Grid>
			</MuiThemeProvider>
		</SongContext.Provider>
		</>
	);
}

export default App;
