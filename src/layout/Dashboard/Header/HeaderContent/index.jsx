// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const navigate = useNavigate();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <IconButton
        target="_blank"
        disableRipple
        color="secondary"
        title="System home"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <HomeOutlined 
          onClick={() => handleHomeClick()}
        />
      </IconButton>

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
