import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function HomeLayout() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Outlet />
    </Box>
  );
}
