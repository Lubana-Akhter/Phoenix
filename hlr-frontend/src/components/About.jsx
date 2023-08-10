import * as React from 'react';
import { Box, Grid, Typography, Button, CardActions, Container } from '@mui/material'
import aboutimg from '../assets/images/about-us-img.png'

const About = () => {
    return (
        <>
            <Container>
                <Grid rowSpacing={2} columnSpacing={1} container my={4} mt={5}>
                    <Grid item xs={4}>
                        <Box p={2} >
                            <Typography variant="h3" component='div'>
                                Who Are We?!
                            </Typography >
                            <Typography variant="h4" component="span" style={{ color: 'green', fontWeight: 'bold' }}>
                                At a Glance
                            </Typography>
                            <Typography variant='body2' color='text.secondary' component='div'>
                                Where dreams meet reality. We believe in providing exceptional service, personalized guidance.
                            </Typography>
                        </Box>
                        <CardActions>
                            <Button size='small' style={{ color: 'green' }}> Read More</Button>
                        </CardActions>
                    </Grid>
                    <Grid item xs={4} >
                        <Box p={2}>
                            <img src={aboutimg} alt="Your Image" style={{ height: '390px', width: '377px' }} />
                        </Box>

                    </Grid>
                    <Grid item xs={4} >
                        <Typography variant="h3" mt={4} mx={3}>
                            100+<br />

                        </Typography>
                        <Typography variant="subtitle1" mx={3}>
                            projects
                        </Typography>
                        <Typography variant="h3" mt={5} mx={3}>
                            1k+<br />
                        </Typography>
                        <Typography variant="subtitle1" mx={3}>
                            Happy Clients
                        </Typography>
                        <Typography variant="h3" mt={5} mx={3}>
                            300+ <br />
                        </Typography>
                        <Typography variant="subtitle1" mx={3}>
                            Rental apartments
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default About;