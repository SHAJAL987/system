import * as React from 'react';
import Grid from '@mui/material/Grid';
import HomeWrapper from './HomeWrapper';
import AppCard from 'components/cards/statistics/AppCard';
import BrightnessLowRoundedIcon from '@mui/icons-material/BrightnessLowRounded';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import cover from 'assets/images/cover.avif';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const handleCardClick = (title) => {
    navigate('/dashboard/default');
    console.log(`${title} card clicked`);
  };

  return (
    <HomeWrapper>
      <Grid container justifyContent="center" sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
        <Grid item xs={12} sm={6} md={4} lg={3} margin={2}>
          <AppCard
            title="System Module"
            description="Manage system modules efficiently"
            icon={BrightnessLowRoundedIcon}
            topBorderImage={cover}
            onClick={() => handleCardClick('System Module')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} margin={2}>
          <AppCard
            title="API Monitor"
            description="Monitor API performance"
            icon={MonitorHeartOutlinedIcon}
            topBorderImage={cover}
            onClick={() => handleCardClick('API Monitor')}
          />
        </Grid>
      </Grid>
    </HomeWrapper>
  );
}
