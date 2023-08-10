import React from 'react';
import { Button, Box, Container } from '@mui/material';
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';
const PageTop = () => {
    return (
        <>
            <Container>
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>

                    <Link to='/'>
                        <img
                            src={logo}
                            alt="Top Head Image"
                            style={{ maxWidth: '100px', marginRight: '16px' }}
                        />
                    </Link>
                    <Box ml="auto">
                        <Link to='/login'>
                            <Button variant="contained" style={{ marginRight: '20px', backgroundColor: '#00A76F', color: 'white', borderRadius: '24px', padding: '10px 30px' }}>
                                Sign in
                            </Button>
                        </Link>
                        <Link to='/register'>
                            <Button variant="contained" style={{ backgroundColor: '#00A76F', color: 'white', borderRadius: '24px', padding: '10px 30px' }}>
                                Sign up
                            </Button>
                        </Link>
                    </Box>
                </div>
            </Container>
        </>

    );
};

export default PageTop;