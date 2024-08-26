import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { makeStyles } from "@mui/styles";
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
  
  const useStyles = makeStyles((theme) => ({
    dialog: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
    dialogTitle: {
      textAlign: "center",
    },
    dialogContent: {
      textAlign: "center",
    },
    dialogActions: {
      justifyContent: "center",
    },
    titleIcon:{
        backgroundColor:'#FFE4E8',
        color: theme.palette.error.light,
        '&:hover':{
            backgroundColor:'#FFE4E8',
            cursor:'default'
        },
        '&:MuiSvgIcon-root':{
            fontSize:'8rem',
        }
    }
  }));
  
  const ConfirmDialog = (props) => {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();
    return (
      <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon} >
            <DeleteOutlineIcon fontSize="large"/>
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">{confirmDialog.title}</Typography>
          <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            color="warning"
            onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}
          >
            No
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="error"
            style={{ textTransform: "none" }}
            onClick={confirmDialog.onConfirm}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmDialog;