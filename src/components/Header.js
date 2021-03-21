import { AppBar, Toolbar, Typography, makeStyles, IconButton} from '@material-ui/core'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import React from 'react'
import { Brightness3, Brightness7 } from '@material-ui/icons';

const useStyles = makeStyles(theme =>({
    root: {
        flexGrow: 1,
    },
    header: {},
    title: {
        marginLeft: theme.spacing(1),
        flexGrow: 1
    },
}));


export default function Header({handleChangeTheme, theme}) {
    const classes = useStyles() ;
    const icon = !theme ? <Brightness7 /> : <Brightness3 />;
    
    const handleIconThemeToggle = () => {handleChangeTheme();}

    return (
        <AppBar className={classes.header} color="primary" position="sticky">
            <Toolbar>
                <IconButton 
                    edge="start"
                    color="inherit"
                    aria-label="mode"
                    onClick={() =>handleIconThemeToggle()}>
                    <LibraryMusicIcon />
                </IconButton>
                <Typography className={classes.title} variant='h6' component='h1'>
                    RhyGuy Music Play
                </Typography>
                <IconButton 
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={() =>handleIconThemeToggle()}>
                {icon}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
