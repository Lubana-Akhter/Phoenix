import React from 'react';
import { useState } from 'react'
import { Grid, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MainSectionCard from './MainSectionCard';
import Filter from '../Filter';
import Property from '../Property';

const MainSection = (props) => {


    const [skills, setSkills] = useState([]);
    const [priceRange, setPriceRange] = useState([20, 80]); // Initial price range values

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    const handleChange = (event) => {
        const index = skills.indexOf(event.target.value);
        if (index === -1) {
            setSkills([...skills, event.target.value]);
        } else {
            setSkills(skills.filter(skill => skill !== event.target.value));
        }
    };
    return (

        <Grid rowSpacing={2} columnSpacing={1} container >
            <Grid item xs={3}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Filter />
            </Grid>
            <Grid item xs={6}>
                <Box p={2} >
                    <Property />
                </Box>
            </Grid>

        </Grid>

    );
};

export default MainSection;
