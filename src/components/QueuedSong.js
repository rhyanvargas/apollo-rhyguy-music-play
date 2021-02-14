import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles({
    container: {
        display:'flex',
        justifyContent: 'space-between'
    },
    imageWrapper: {},
    content: {},
    iconWrapper: {},

})

export default function QueuedSong({song}) {
    const {title, artist, thumbnail} = song;
    const classes = useStyles();
    const {container} = classes

    return (
        <>
            <List dense className={container} >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        <img src={thumbnail} alt={title}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={title} secondary={artist} />
                </ListItem>
                <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label="delete">
                            <Delete/>
                        </IconButton>
                </ListItemSecondaryAction>
            </List>
        </>
    )
}
