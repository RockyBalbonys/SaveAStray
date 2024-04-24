import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import image from '../../assets/images/passiveAdminSignupImg.png';

function AdminDashboardSignup() {
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [displayValues, setDisplayValues] = useState(['', '', '', '']);

  useEffect(() => {
    const savedValues = localStorage.getItem('inputValues');
    if (savedValues) {
      setInputValues(JSON.parse(savedValues));
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);
      localStorage.setItem('inputValues', JSON.stringify(newValues));

      // Display the number briefly before replacing it with an asterisk
      const newDisplayValues = [...displayValues];
      newDisplayValues[index] = value;
      setDisplayValues(newDisplayValues);

      setTimeout(() => {
        newDisplayValues[index] = value !== '' ? '*' : '';
        setDisplayValues(newDisplayValues);
      }, 1000);  // Replace with asterisk after 1 second
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: orange[500],
        color: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
          borderRadius: '8px',
          width: '80%',
          height: '80%',
          padding: '32px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '30%', // Adjust this value to occupy desired percentage of the parent box's height
            background:`url(${image})`,
            backgroundSize: 'contain', // Set background size to contain
            backgroundRepeat: 'no-repeat', // Ensure image is not repeated
            backgroundPosition: 'top center', // Move image to the top
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px', // Add margin to push down the content below
          }}
        >
          {/* No need for img tag here */}
        </Box>
        
        <Typography variant="subtitle1" style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
          Enter Administrator Pin
        </Typography>
        <Box display="flex" justifyContent="center">
          {inputValues.map((value, index) => (
            <TextField
              key={index}
              variant="outlined"
              inputProps={{ inputMode: 'numeric', maxLength: 1 }}
              value={displayValues[index]} // Replaced with displayValues[index]
              onChange={(e) => handleInputChange(index, e.target.value)}
              sx={{ color: 'black', width: '36px', height: '41px', textAlign: 'center', margin: '0 5px' }}
            />
          ))}
        </Box>
        <Button variant="contained" color="primary" style={{ marginTop: '20px', alignSelf: 'center' }}>
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default AdminDashboardSignup;