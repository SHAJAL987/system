import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function AppCard({
  color = 'primary',
  title,
  description,
  icon: IconComponent,
  onClick,
  topBorderImage
}) {
  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: 3,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
        },
        '&:active': {
          transform: 'scale(0.98)',
          boxShadow: 4,
        },
      }}
      onClick={onClick}
    >
      {topBorderImage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 10, // Thin top border
            backgroundImage: `url(${topBorderImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1, // Positioned above other elements but below the content
          }}
        />
      )}
      <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 2, paddingTop: topBorderImage ? '12px' : '16px' }}>
        {IconComponent && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 60,
              mb: 2,
              zIndex: 2,
            }}
          >
            <IconComponent
              sx={{
                fontSize: 60,
                color: color || 'primary.main',
              }}
            />
          </Box>
        )}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.primary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

AppCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType, // Use elementType for icon components
  onClick: PropTypes.func,
  topBorderImage: PropTypes.string,
};
