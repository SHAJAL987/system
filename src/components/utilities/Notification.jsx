import React from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme =>({
    root:{
        top: theme.spacing(9)
    }
}))

const Notification = (props) => {
    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (e,reason) =>{
        setNotify({
            ...notify,
            isOpen:false
        })
    }

  return (
    <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration = {5000}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
        onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification