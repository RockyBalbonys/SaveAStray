import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Card, CardContent, Grid, Paper } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const data = [
  { month: 'Jan', adoptions: 20 },
  { month: 'Feb', adoptions: 30 },
  { month: 'Mar', adoptions: 25 },
  // Add more months as needed
];

const pieData = [
  { name: 'Available', value: 400 },
  { name: 'In Process', value: 300 },
  { name: 'Adopted', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Overview() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF7A00' }}>
        Pet Shelter Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Number of Parents
            </Typography>
            <Typography variant="body1">
              {/* Replace with actual count */}
              50
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Number of Shelters
            </Typography>
            <Typography variant="body1">
              {/* Replace with actual count */}
              3
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Number of Adopted Pets
            </Typography>
            <Typography variant="body1">
              {/* Replace with actual count */}
              100
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Donations Received
            </Typography>
            <Typography variant="body1">
              {/* Replace with actual amount */}
              $5000
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Monthly Adoption Chart
            </Typography>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid stroke="#FFFFFF" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip />
              <Legend />
              <Bar dataKey="adoptions" fill="white" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#FF7A00', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Pet Status Chart
            </Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default function AdminDashboard() {
    return (
        <div style={{ display: 'flex' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        SaveAStray
                    </Typography>
                    {/* Add sign out option here */}
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent">
                <List>
                    {['Dashboard', 'User Management', 'Analytics'].map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <main style={{ flexGrow: 1, padding: 3 }}>
                {/* Welcome Message */}
                <Typography variant="h6">Welcome Back, Admin!</Typography>

                {/* Overview Component */}
                <Overview />
            </main> 
        </div> 
    );
}
