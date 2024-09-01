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
      <Grid container justifyContent="center" sx={{ marginTop: '7%', marginLeft: '5%', marginRight: '5%' }}>
        <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', gap: '20px', width: '100%', flexWrap: "wrap"}}> 
          <AppCard
            title="System Module"
            description="Manage system modules efficiently"
            icon={BrightnessLowRoundedIcon}
            topBorderImage={cover}
            onClick={() => handleCardClick('System Module')}
          />
          <AppCard
            title="API Monitor"
            description="Monitor API performance"
            icon={MonitorHeartOutlinedIcon}
            topBorderImage={cover}
            onClick={() => handleCardClick('API Monitor')}
          />
        </div>
      </Grid>
    </HomeWrapper>
  );
}
