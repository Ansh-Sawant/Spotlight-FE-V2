import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#f8f8f8', 
        padding: '15px 20px', 
        textAlign: 'center', 
        borderTop: '1px solid #e0e0e0',
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
        Made By: Ansh Sawant
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold' }}>
        © {new Date().getFullYear()} Spotlight News. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
