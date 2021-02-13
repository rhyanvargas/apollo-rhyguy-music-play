import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,makeStyles } from '@material-ui/core'
import { AddBoxOutlined, Link } from '@material-ui/icons'
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useState } from 'react'
import {customStyles} from '../theme.js'


const useStyles = makeStyles(theme => ({
    ...customStyles,
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    dialog : {
        textAlign: 'center',
    },
    thumbnail: {
        width: '90'
    }

}))


export default function AddSong() {
    const classes = useStyles();

    const [dialog, setDialog] = useState(false)
    const imgUrl = 'http://unsplash.it/500?random&gravity=center'
    const imgName = 'dummy'

    const inputProps = {
        startAdornment: <InputAdornment position="start"><Link/></InputAdornment>,
    }

    const handleCloseDialog = () => {
        setDialog(false);
    }

    return (
        <div className={classes.container}>
            <Dialog
                className={classes.dialog}
                open={dialog}
                onClose={handleCloseDialog} >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <img className={classes.imgResponsive} src={imgUrl} alt={imgName}/>
                        <TextField 
                            margin="dense"
                            name="artist"
                            label="Artist"
                            fullWidth
                        />
                        <TextField 
                            margin="dense"
                            name="thumbnail"
                            label="Thumbnail"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} >Cancel</Button>
                        <Button  variant="outlined" color="primary">Add Song</Button>
                    </DialogActions>
            </Dialog>
            <TextField
                className={classes.urlInput}
                placeholder="Add Youtube or Soundcloud Url"
                fullWidth
                margin="normal"
                type="url"
                InputProps = {inputProps} />
            <Button 
            onClick={()=>setDialog(true)}
                color="primary" 
                variant="contained"
                endIcon={<AddBoxOutlined/>}
            >Add</Button>
        </div>
    )
}
