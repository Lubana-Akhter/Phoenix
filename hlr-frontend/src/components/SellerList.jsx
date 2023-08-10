import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import sellerListPic from '../assets/images/seller-list-pic.svg'
import { Link } from 'react-router-dom';

const SellerList = () => {
    return (
        <>
            <Container>
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <Typography variant="h5">Seller List</Typography>
                    <Link to="/create-property">
                        <Button variant="contained" color="success">
                            Create
                        </Button>
                    </Link>
                </Box>


                <List>
                    <ListItem>
                        <img src={sellerListPic} alt="Your Image" style={{ height: '85px', width: '105px' }} />
                        <ListItemText primary="Amanda Properties" secondary="Jan 9, 2014" style={{ marginLeft: '20px' }} />
                        <ListItemText primary="rent" />
                        <ListItemText primary="2 bed" />
                        <ListItemText primary="2 baths" />
                        <ListItemText primary="garage" />
                        <IconButton edge="end" aria-label="edit">
                            <EditOutlinedIcon fontSize='medium' />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" style={{ color: 'red' }}  >
                            <DeleteIcon fontSize='medium' />
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <img src={sellerListPic} alt="Your Image" style={{ height: '85px', width: '105px' }} />
                        <ListItemText primary="Amanda Properties" secondary="Jan 7, 2014" style={{ marginLeft: '20px' }} />
                        <ListItemText primary="rent" />
                        <ListItemText primary="2 bed" />
                        <ListItemText primary="2 baths" />
                        <ListItemText primary="garage" />
                        <IconButton edge="end" aria-label="edit">
                            <EditOutlinedIcon fontSize='medium' />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" style={{ color: 'red' }} >
                            <DeleteIcon fontSize='medium' />
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <img src={sellerListPic} alt="Your Image" style={{ height: '85px', width: '105px' }} />
                        <ListItemText primary="Amanda Properties" secondary="July 20, 2014" style={{ marginLeft: '20px' }} />
                        <ListItemText primary="rent" />
                        <ListItemText primary="2 bed" />
                        <ListItemText primary="2 baths" />
                        <ListItemText primary="garage" />
                        <IconButton edge="end" aria-label="edit">
                            <EditOutlinedIcon fontSize='medium' />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" style={{ color: 'red' }} >
                            <DeleteIcon fontSize='medium' />
                        </IconButton>
                    </ListItem>
                </List>
            </Container>
        </>
    );
};

export default SellerList;