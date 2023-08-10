import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast, IsEmail } from "../helper/FormHelper";
import { Toaster } from 'react-hot-toast';
import backgroundImage from '../assets/images/bacground-img.png';
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import {
    TextField, Button, Container, Typography, Grid,
    Paper, Icon
} from '@mui/material';


const styles = {
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    iconStyle: {
        fontSize: '30px',
    },
};
const BaseURL = "http://localhost:5000/api"
const Register = () => {
    const containerStyle = {
        minHeight: '100vh', // Set the minimum height to fill the viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const paperStyle = {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const titleStyle = {
        marginBottom: '20px',
        fontFamily: 'cursive',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center',
    };


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleRegister = async () => {

        let URL = BaseURL + "/user/register";
        if (IsEmpty(name)) {

            ErrorToast("Please provide name");
        }
        else if (IsEmpty(email)) {
            ErrorToast("Please provide email");
        }
        else if (IsEmpty(password)) {
            ErrorToast("Please provide password");
        }
        else if (IsEmail(email)) {
            ErrorToast("Invalid Email Address");
        }
        else {
            try {
                const response = await axios.post(URL, {
                    name: name,
                    email: email,
                    password: password,
                });

                SuccessToast("Successfully Registered");
                navigate("/login")

                console.log('User registered successfully:', response);
            } catch (error) {
                console.error('Error registering user:', error.message);
            }
        }

    };
    return (

        <div style={containerStyle}>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={paperStyle}>
                    <Link to='/'>
                        <img
                            src={logo}
                            alt="Top Head Image"
                            style={{ maxWidth: '160px', height: "62px", margin: '20px' }}
                        />
                    </Link>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleRegister} variant="contained" color="success" fullWidth style={titleStyle}>
                                    Sign Up
                                </Button>
                                <Link to="/login" style={{ textDecoration: "none" }}><Typography variant="h5" style={titleStyle}>Sign in</Typography></Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Toaster />
            </Container>
        </div>

    );
};

export default Register;