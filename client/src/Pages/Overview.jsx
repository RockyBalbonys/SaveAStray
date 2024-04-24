// src/components/Overview.js

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Overview = () => {
  return (
    <Grid container spacing={3}>
      {/* Total Adoptions */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Adoptions</Typography>
            <Typography variant="h4" color="primary">
              1,234
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Pending Adoptions */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Pending Adoptions</Typography>
            <Typography variant="h4" color="secondary">
              567
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Successful Adoptions */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Successful Adoptions</Typography>
            <Typography variant="h4" color="success">
              789
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Failed Adoptions */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Failed Adoptions</Typography>
            <Typography variant="h4" color="error">
              123
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
