import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import GetAppIcon from '@mui/icons-material/GetApp';
import jembotImage from '../assets/images/animals/jembot.jpg'; 
import felixImage from '../assets/images/animals/felix.jpg';
import inibamImage from '../assets/images/animals/inibam.jpg';
import lansImage from '../assets/images/animals/lans.jpg';
import pugdoyImage from '../assets/images/animals/pugdoy.jpg';
import ramboImage from '../assets/images/animals/rambo.jpg';
import Frame200Send from '../assets/images/Frame 200Send.svg'; 

const headerStyles = {
    display: 'flex',
    height: '169px',
    padding: '40px 10%',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    alignSelf: 'stretch',
    background: 'linear-gradient(229deg, #F59A0B 22.72%, #EA5A0C 101.08%)',
    width: '100%',
};

const imageStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid orange',
};

const buttonStyle = {
  padding: '10px',
  minWidth: 'auto',
  height: '100%',
};

const AdoptionRequests = [
    { name: 'Joemen', time: 'a few seconds ago', imageUrl: jembotImage, redirectTo: '/questionnaire/joemen' }, 
    { name: 'Redeeet', time: '1 minute ago', imageUrl: felixImage, redirectTo: '/questionnaire/redeeet' },
    { name: 'Rokcyyyy :>', time: '1 hour ago', imageUrl: inibamImage, redirectTo: '/questionnaire/rokcyyyy' },
    { name: 'Mateek', time: '2 hours ago', imageUrl: lansImage, redirectTo: '/questionnaire/mateek' },
    { name: 'Iniba’am', time: '1 day ago', imageUrl: pugdoyImage, redirectTo: '/questionnaire/inibaam' },
    { name: 'Lancer', time: '2 days ago', imageUrl: ramboImage, redirectTo: '/questionnaire/lancer' },
];

function RequestShelter() {
    const navigate = useNavigate();

    const handleClick = (redirectTo) => {
        navigate(redirectTo);
    };

    return (
        <div style={{ width: '100%', overflowY: 'auto' }}>
            <style>
                {`
                    body {
                        overflow-y: auto;
                    }
                    body::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <div style={headerStyles}>
                <Typography variant="h4" style={{ color:'#FFFFFF' }}>Animal Request Adoption Information</Typography>
                <Typography style={{ color:'#FFFFFF' }}>Look about the adoption process and find someone to have a perfect furry companion!</Typography>
            </div>
            <Container style={{ padding: '1rem', marginTop: '20px' }}>
                {AdoptionRequests.map((request, index) => (
                    <div key={index} onClick={() => handleClick(request.redirectTo)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: index % 2 === 0 ? '#FFF' : '#FFF0DE', padding: '16px', borderBottom: '2px solid orange', borderRadius: '10px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={request.imageUrl} alt={request.name} style={imageStyle} />
                            <div>
                                <Typography><strong>{request.name}</strong> requested an adoption</Typography>
                                <Typography variant="caption" color="#2F4858">{request.time}</Typography>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Button variant="contained" color="primary" style={{ backgroundColor: '#EE7200', ...buttonStyle }}>
                                <CheckIcon style={{ color: '#FFFFFF' }} />
                            </Button>
                            <Button variant="contained" color="error" style={{ backgroundColor: '#EE7200', ...buttonStyle }}>
                                <ClearIcon style={{ color: '#FFFFFF' }} />
                            </Button>
                            {/* Replaced SendIcon with the imported SVG */}
                            <Button variant="contained" color="primary" style={{ backgroundColor: '#EE7200', ...buttonStyle }}>
                                <img src={Frame200Send} alt="Send" style={{ width: '24px', height: '24px' }} />
                            </Button>
                            <Button variant="contained" color="success" style={{ backgroundColor: '#EE7200', ...buttonStyle }}>
                                <GetAppIcon style={{ color: '#FFFFFF' }} />
                            </Button>
                        </div>
                    </div> 
                ))}
            </Container>
        </div>
    );
}

export default RequestShelter;
