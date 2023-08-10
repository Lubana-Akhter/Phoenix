import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Container, Stack, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import RoomIcon from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';

const MainSectionCard = () => {
    const cardData = [
        {
            id: 1,
            image: 'https://source.unsplash.com/random',

        },
        {
            id: 2,
            image: 'https://source.unsplash.com/random',

        },
        {
            id: 3,
            image: 'https://source.unsplash.com/random',

        },

    ];
    return (
        <>
            <Grid>
                <Stack direction='row' spacing={1}>
                    <Typography variant='subtitle1'>398 Results </Typography>
                    <Typography variant='caption'>in Scotland</Typography>
                </Stack>
            </Grid>


            <Grid container spacing={2} mt={3}>
                {cardData.map((card) => (
                    <Grid key={card.id} item xs={12} sm={6} md={3}>
                        <Card>
                            <CardMedia component="img" height="150" image={card.image} alt="Image" />
                            <CardContent>
                                <Link to='/property-details'>
                                    <Typography gutterBottom variant='h6' component='div'>
                                        Modern House
                                    </Typography>
                                </Link>
                                <Stack direction="row" spacing={12} >
                                    <IconButton aria-label="Love" >
                                        <RoomIcon />
                                    </IconButton>

                                    <IconButton aria-label="Love" style={{ color: 'red' }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>

        </>
    );
};

export default MainSectionCard;