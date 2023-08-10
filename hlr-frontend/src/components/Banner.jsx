import * as React from 'react';
import { Box, Stack, Grid, Typography, Button, Container } from '@mui/material'
import img from '../assets/images/Banner-img.png'
import vector from '../assets/images/Vector 12.svg'
import { Link } from 'react-router-dom';


const Banner = () => {


    return (
        <>
            <Container>
                <Grid rowSpacing={2} columnSpacing={1} container my={4}>
                    <Grid item xs={6}  md={6} sm={12}>
                        <Box p={2} >
                            <Typography variant="h3">
                                FIND THE
                            </Typography>
                            <Typography variant="h4" component="span" style={{ color: 'green', fontWeight: 'bold' }}>
                                HOUSE  OF YOUR
                            </Typography>
                            <Typography variant="h4">
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" component="span" display="flex" alignItems="center" >
                                    DREAM
                                    <img src={vector} alt="Your Image" style={{ height: '96px', width: '47px', marginTop: "20px" }} />
                                </Typography>

                            </Box>
                            <Typography variant="subtitle1">
                                Where dreams meet reality. We believe in providing exceptional service, personalized guidance, and transparent transactions. Trust, integrity, and a commitment to finding your perfect home define our brand.
                            </Typography>
                            <Link to="/login">
                                <Button variant="contained" style={{ backgroundColor: '#00A76F', color: 'white', marginTop: '1rem', borderRadius: '24px' }}>GET STARTED</Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6} >
                        <Box p={2}>
                            <img src={img} alt="Your Image" style={{ height: '380px', width: '530px' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Banner;