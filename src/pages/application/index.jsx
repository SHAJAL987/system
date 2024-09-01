import {
  Button, Grid, Modal, Typography, Switch,
  styled, useTheme
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainCard from 'components/MainCard';
import ApplicationTable from './ApplicationTable';
import CreateAppForm from './CreateAppForm';
import { getTokenFromSessionStorage } from '../../utils/tokenUtils';
import { applicationListUrl } from '../../utils/apiList';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Title from 'components/utilities/Title';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
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

export default function Application() {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [application, setApplication] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    id: '',
    appCode: '',
    appName: '',
    appUrl: '',
    appStatus: ''
  });

  const getApplication = async () => {
    try {
      const token = getTokenFromSessionStorage();
      if (!token) {
        console.error('No token found');
        return navigate('/login');
      }

      const result = await axios.get(applicationListUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setApplication(result.data.applicationList);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getApplication();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditButton = (data) => {
    setValues(data);
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Update logic here
    setLoading(false);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Applications</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              color="error"
              onClick={handleOpen}
            >
              Add Application
            </Button>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ApplicationTable
            data={application}
            onUpdate={handleUpdate}
            onEdit={handleEditButton}
          />
        </MainCard>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MainCard sx={style}>
          <CreateAppForm initialValues={values} onSubmit={handleUpdate} />
        </MainCard>
      </Modal>
    </Grid>
  );
}
