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
import songReducer from "./reducer";

export const SongContext = createContext({
	song: {
		artist: "",
		duration: 0,
		id: "",
		thumbnail: "",
		title: "",
		url: "",
	},
});

function App() {
	const initialSongState = useContext(SongContext);
	const [state, dispatch] = useReducer(songReducer, initialSongState);

	const [theme, setTheme] = useState(true);

	const appliedTheme = createMuiTheme(!theme ? themeDark : themeMain);

	const myTheme = useTheme();

	const isLessThanSmBreakpoint = useMediaQuery(myTheme.breakpoints.down("sm"));

	const useStyles = makeStyles({
		header: {},
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

	return (
		<>
			<SongContext.Provider value={{ state, dispatch }}>
				<MuiThemeProvider theme={appliedTheme}>
					<CssBaseline />
					<Grid container>
						<Hidden only="xs">
							<Grid item xs={12}>
								<Header
									className={classes.header}
									handleChangeTheme={handleChangeTheme}
									theme={theme}
								/>
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
