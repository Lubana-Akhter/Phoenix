import React from 'react';
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
    Typography, Grid, Box, FormControlLabel, Checkbox,
    FormControl, FormLabel, FormGroup, Autocomplete, TextField, Stack, Radio, RadioGroup
} from '@mui/material';




const Filter = () => {
    const locations = [
        { name: 'New York' },
        { name: 'Los Angeles' },
        { name: 'Chicago' },
        { name: 'San Francisco' },
        { name: 'Miami' },

    ];
    const [checkedItems, setCheckedItems] = useState([]);
    const [priceRange, setPriceRange] = useState([20, 80]); // Initial price range values
    console.log(checkedItems)
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: checked,
        }));
    };
    return (
        <>
            <Grid item xs={6}>
                <Typography variant='h5' gutterBottom pb={4}>Filter</Typography>
                <Autocomplete
                    options={locations}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Location"
                            variant="outlined"
                            placeholder="Enter location"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <React.Fragment>
                                        <LocationOnIcon color="action" />
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                <Box mt={5}>
                    <FormLabel gutterBottom>Types of places</FormLabel>
                </Box>
                <Stack direction='row' spacing={5}>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox name="All"
                                    checked={checkedItems.All || false} onChange={handleCheckboxChange} color="success" defaultChecked="All" />
                            }
                            label="All"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="Building"
                                    checked={checkedItems.Building || false} onChange={handleCheckboxChange} color="success" />
                            }
                            label="Building "
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="Apartment"
                                    checked={checkedItems.Apartment || false} onChange={handleCheckboxChange} color="success" />
                            }
                            label="Apartment "
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox name="Office"
                                    checked={checkedItems.Office || false} onChange={handleCheckboxChange} color="success" />
                            }
                            label="Office"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="Shop"
                                    checked={checkedItems.Shop || false} onChange={handleCheckboxChange} color="success" />
                            }
                            label="Shop "
                        />
                        <FormControlLabel
                            control={
                                <Checkbox name="House"
                                    checked={checkedItems.House || false} onChange={handleCheckboxChange} color="success" />
                            }
                            label="House "
                        />
                    </FormGroup>
                </Stack>


                <Stack mt={5} gutterBottom>
                    <FormControl>
                        <FormLabel>Price Range</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="val1"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="val1" control={<Radio />} label="10000-20000" color="success" />
                            <FormControlLabel value="val2" control={<Radio />} label="20000-40000" color="success" />
                            <FormControlLabel value="val3" control={<Radio />} label="50000-60000" color="success" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
                <Typography gutterBottom mt={5}>Size</Typography>
                <Box display="flex" gap={5} color="success">

                    <TextField
                        label="Min Sq. Ft"
                        variant="outlined"
                        fullWidth
                    // Add your onChange and value props here
                    />
                    <TextField
                        label="Max Sq. Ft"
                        variant="outlined"
                        fullWidth
                    // Add your onChange and value props here
                    />
                </Box>

                {/* <Box mt={5}>
                    <FormLabel gutterBottom>Features</FormLabel>
                </Box>
                <Stack direction='row' spacing={5}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox name="All"
                                        checked={checkedItems.All || false} onChange={handleCheckboxChange} color="success" defaultChecked="All" />
                                }
                                label="All"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="Building"
                                        checked={checkedItems.Building || false} onChange={handleCheckboxChange} color="success" />
                                }
                                label="Building "
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="Apartment"
                                        checked={checkedItems.Apartment || false} onChange={handleCheckboxChange} color="success" />
                                }
                                label="Apartment "
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox name="Office"
                                        checked={checkedItems.Office || false} onChange={handleCheckboxChange} color="success" />
                                }
                                label="Office"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="Shop"
                                        checked={checkedItems.Shop || false} onChange={handleCheckboxChange} color="success" />
                                }
                                label="Shop "
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="House"
                                        checked={checkedItems.House || false} onChange={handleCheckboxChange} color="success" />
                                }
                                label="House "
                            />
                        </FormGroup>
                    </FormControl>
                </Stack> */}
            </Grid>
        </>
    );
};

export default Filter;