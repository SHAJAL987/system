// material-ui
import { Button, FormControlLabel, FormGroup, Grid, IconButton, List, ListItemButton, ListItemText, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Title from 'components/utilities/Title';
// import Notification from 'components/utilities/Notification';
// import ConfirmDialog from 'components/utilities/ConfirmDialog';
import OrdersTable from '../dashboard/OrdersTable';
import ApplicationTable from './ApplicationTable';

//import api endpoint
import {
  saveAppUrl,
  applicationListUrl
} from '../../utils/apiList';

import axios from "axios";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Switch from "@mui/material/Switch";
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
const columns = [
  { id: "id", label: "Id" },
  { id: "appCode", label: "App Code" },
  { id: "appName", label: "App Name" },
  { id: "appUrl", label: "URL" },
  { id: "appStatus", label: "Status" },
];

export default function ApplicationForm({openModal}) {

  let rows = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //------------------- Pagination------------------->
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //------------------- Get All List ------------------->
  const [application, setApplication] = useState([]);
  React.useEffect(()=>{
    getApplication();
  },[])

  async function getApplication() {
    const result = await axios.get(applicationListUrl);
    const data = result.data.applicationList;
    console.log(data);
    setApplication(data);
  }

  //--------------------- Modal ------------------------->
   const [open, setOpen] = React.useState(true);
  function handleOpen(){
    setOpen(true);
  }
  function handleClose(){
    setOpen(false);
  }
  const [loading, setLoading] = React.useState(false);

  //---------------- Switch Button Action ---->
  const [switchval, setSwitchVal] = useState(true);
  const [status, setStatus] = useState("Y");
  const handleStatus = (e) => {
    let vstatus = e.target.checked;

    if (vstatus) {
      setStatus("Y");
      setSwitchVal(true);
    } else {
      setStatus("N");
      setSwitchVal(false);
    }
  };

  //--------------------- Update ------------------------
  const [values, setValues] = useState({
    id:'',
    appCode:'',
    appName:'',
    appUrl:'',
    appStatus:''
  })
  
  const handleEditButton = (data) =>{
    setValues({
      id:data.id,
      appCode:data.appCode,
      appName:data.appName,
      appUrl:data.appUrl,
      appStatus:data.appStatus
    })
    console.log("App Status: "+data.appStatus);
    if (data.appStatus === "Active") {
      setSwitchVal(true);
    } else {
      setSwitchVal(false);
    }
    setOpen(true);
  }


  const handleUpdate = async(e) =>{
    e.preventDefault();
  }

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <MainCard sx={style}>
            <Title> 
              <Typography variant="h3" sx={{color:'white', fontSize:'20px', padding:'5px'}}>Update Application</Typography>
            </Title>
            <Grid container spacing={2} md={12} xs={12} sm={12} xl={12}>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  label="Application Id"
                  name="id"
                  required
                  variant="outlined"
                  disabled
                  // onChange={handleChange}
                  value={values.id}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  label="Application Code"
                  name="appCode"
                  required
                  variant="outlined"
                  disabled
                  // onChange={handleChange}
                  value={values.appCode}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  label="Application Name"
                  name="appName"
                  required
                  variant="outlined"
                  // onChange={handleChange}
                  value={values.appName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  label="Application Url"
                  name="appUrl"
                  required
                  variant="outlined"
                  // onChange={handleChange}
                  value={values.appUrl}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} mt={1} ml={1}>
                <FormGroup>
                  <FormControlLabel
                    control={<Android12Switch />}
                    label="Active Status"
                    onChange={handleStatus}
                    checked={switchval}
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={12}
              mt={3}
              // style={{ display: "flex", justifyContent: "space-between" }}
            >
              {values.id === "" ? (
                <LoadingButton
                color="secondary"
                // onClick={handleSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                endIcon={<SendOutlinedIcon />}
              >
                Submit
              </LoadingButton>
              ):(
                <LoadingButton
                color="secondary"
                // onClick={handleUpdate}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                endIcon={<SendOutlinedIcon />}
              >
                Apply Change
              </LoadingButton>
              )}
              <Button
                variant="contained"
                endIcon={<CachedOutlinedIcon />}
                color="info"
                // onClick={handleClear}
                style={{ textTransform: "none", marginLeft:'1%' }}
              >
                Clear
              </Button>
              <Button
                variant="outlined"
                endIcon={<CloseOutlinedIcon />}
                color="secondary"
                onClick={handleClose}
                style={{ textTransform: "none", marginLeft:'1%' }}
              >
                Cancel
              </Button>
            </Grid>
          </MainCard>
        </Modal>
    </>
  );
}
