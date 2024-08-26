import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project import

import Logo from 'components/logo';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function HomeWrapper({ children }) {
  return (
    <>
      <AuthBackground />
      <Grid container>
        {children}
      </Grid>
    </>
  );
}

HomeWrapper.propTypes = { children: PropTypes.node };
