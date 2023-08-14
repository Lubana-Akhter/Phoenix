import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast } from "../helper/FormHelper";
import { Toaster } from 'react-hot-toast';

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    Grid,
    Container,
    Paper,
    Input
} from '@mui/material';

//const BaseURL = "http://localhost:5000/api"

let token = JSON.parse(localStorage.getItem("user")).token;
//let Id = JSON.parse((localStorage.getItem("user"))._id);
const CreateProperty = () => {
    const [category, setCategory] = useState([]);
    const [categoryValue, setCategoryValue] = useState('');

    useEffect(() => {
        // Call your API here to fetch the data
        fetchData();
    }, []);

    let navigate = useNavigate();
    // const [images, setImages] = useState([]);
    // const filleOnChange = (event) => {
    //     const files = event.target.files;
    //     files.forEach(file => {
    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             const fileURL = e.target.result;
    //             setImages([...images, fileURL])
    //             console.log("File contents:", fileURL);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    //     )
    // }



    // const [imageFile, setImageFile] = useState(null);
    // const handleImageChange = (event) => {
    //     setImageFile(event.target.files[0]);
    // };




    const [propertyData, setPropertyData] = useState({
        name: '',
        description: '',
        categoryId: "",
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        type: '',
        status: '',
        storeys: '',
        land_area: '',
        basement: '',
        parking: '',
        floor: '',
        unit: '',
        price: '',
        baths: '',
        beds: '',
    });
    //fetch category
    const fetchData = async () => {

        try {
            const response = await axios.get('https://hlr-api.onrender.com/api/category/list');
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //change category
    // const handleCategoryChange = (event) => {
    //     setCategoryValue(event.target.value);

    // };


    const handleCategoryChange = (event) => {
        setCategoryValue(event.target.value);

        // Get the selected category object based on the value
        const selectedCategory = category.find(item => item._id === event.target.value);

        if (selectedCategory) {
            setPropertyData((prevData) => ({
                ...prevData,
                categoryId: selectedCategory._id,

            }));

        }

    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPropertyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        debugger;
        event.preventDefault();
        //let URL = BaseURL + "/property/create";
        //test
        const proData = new FormData();
        proData.append("name", propertyData.name);
        proData.append("description", propertyData.description);
        proData.append('location', JSON.stringify(propertyData.location));
        proData.append("categoryId", propertyData.categoryId);
        proData.append("type", propertyData.type);
        proData.append("status", propertyData.status);
        proData.append("storeys", propertyData.storeys);
        proData.append("land_area", propertyData.land_area);
        proData.append("basement", propertyData.basement);
        proData.append("parking", propertyData.parking);
        proData.append("floor", propertyData.floor);
        proData.append("unit", propertyData.unit);
        proData.append("price", propertyData.price);
        proData.append("baths", propertyData.baths);
        proData.append("beds", propertyData.beds);
        //proData.append('image', imageFile);


        let config = {
            headers: {
                token: token,
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQwZTg5MmVlN2YzNjEwM2NhYTVmODIiLCJpYXQiOjE2OTE1NTU1MDMsImV4cCI6MTY5MTU2MjcwM30.wTix0qINJXffsRnN3VKxuF-_-24TbNk_kBz-v2O-oTI",
            },
        };
        try {
            // Make API call to create property
            const response = await axios.post("http://localhost:5000/api/property/create", proData, config);
            // Handle successful response
            navigate("/user-buy");
            console.log('Property created successfully:', response.data);
        } catch (error) {
            // Handle error
            debugger;
            console.error('Error creating property:', error);
        }


    };

    return (
        <>
            <Container>
                <Paper>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" gutterBottom>
                            Create Property
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Property Name"
                                    name="name"
                                    value={propertyData.name}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>

                                <FormControl required fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select

                                        name='category'
                                        value={categoryValue}
                                        onChange={handleCategoryChange}
                                        label="Category"
                                    >
                                        {category.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name} {/* Change this based on your API response structure */}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={propertyData.description}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography>Location:*</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="address"
                                    name="address"
                                    value={propertyData.address}
                                    onChange={handleInputChange}

                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="city"
                                    name="city"
                                    value={propertyData.city}
                                    onChange={handleInputChange}

                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="state"
                                    name="state"
                                    value={propertyData.state}
                                    onChange={handleInputChange}

                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="zipcode"
                                    name="zipcode"
                                    value={propertyData.zipcode}
                                    onChange={handleInputChange}

                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="country"
                                    name="country"
                                    value={propertyData.country}
                                    onChange={handleInputChange}

                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <FormControl required fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={propertyData.type}
                                        onChange={handleInputChange}
                                        label="Type"
                                    >
                                        <MenuItem value="Rent">Rent</MenuItem>
                                        <MenuItem value="Sell">Sell</MenuItem>
                                        <MenuItem value="Both">Both</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl required fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={propertyData.status}
                                        onChange={handleInputChange}
                                        label="Status"
                                    >
                                        <MenuItem value="Rented">Rented</MenuItem>
                                        <MenuItem value="Sold">Sold</MenuItem>
                                        <MenuItem value="Available">Available</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Storey"
                                    name="storeys"
                                    type='number'
                                    value={propertyData.storeys}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Land Area"
                                    name="land_area"
                                    type='number'
                                    value={propertyData.land_area}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Basement"
                                    name="basement"
                                    value={propertyData.basement}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Parking"
                                    name="parking"
                                    value={propertyData.parking}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Floor"
                                    name="floor"
                                    type='number'
                                    value={propertyData.floor}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Unit"
                                    name="unit"
                                    type='number'
                                    value={propertyData.unit}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    type='number'
                                    value={propertyData.price}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Bath"
                                    name="baths"
                                    type='number'
                                    value={propertyData.baths}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Bed"
                                    name="beds"
                                    type='number'
                                    value={propertyData.beds}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    {/* <InputLabel>Image</InputLabel> */}
                                    {/* <Input
                                        type="file"
                                        inputProps={{ accept: 'image/*' }}
                                        onChange={handleImageChange }
                                        required
                                    /> */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                
                                    <Button type="submit" variant="contained" color="primary" style={{ marginBottom: "2rem" }}>
                                        Create Property
                                    </Button>
                              
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Toaster />
        </>
    );
};

export default CreateProperty;






