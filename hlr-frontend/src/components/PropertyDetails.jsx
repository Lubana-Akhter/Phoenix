import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import detaisPic from "../assets/images/property-details.jpg";
import GoogleMap from "./GoogleMap";
import axios from "axios";
import { BaseURL } from "../core/BaseUrl";

const PropertyDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState(null);

  const Item = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id) {
      getFatchData(id);
    }
  }, []);

  const getFatchData = async (id) => {
    try {
      const { data } = await axios.get(`${BaseURL}/property/read/${id}`);
      setProperty(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {property && (
        <Box sx={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
          <Box>
            <Stack direction="row" spacing={2} p={1}>
              <Typography variant="h6">Property</Typography>
              <Typography variant="caption">in Scotland</Typography>
            </Stack>
          </Box>
          <Box sx={{ width: "100%", maxWidth: 717 }} mt={2}>
            <Stack>
              <img
                src={property.images[currentImageIndex]}
                alt="Your Image"
                style={{ width: "100%", height: "auto" }}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={3}>
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Your Image"
                  style={{ height: "85px", width: "auto", cursor: "pointer" }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pt={2}>
            <Typography variant="h5">{property.name}</Typography>

            <Box>
              <Button variant="contained" color="success" sx={{ mr: 2 }}>
                Buy
              </Button>
              <Button variant="contained" color="secondary">
                Visit
              </Button>
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2">{property.createdAt}</Typography>
            <Typography variant="caption" display="block">
              {property.location?.country}
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              {property.description}
            </Typography>
            <Stack direction="row" spacing={5} mt={3}>
              <Typography>{property.beds} Beds</Typography>
            </Stack>
            <Stack direction="row" spacing={5} mt={1}>
              <Typography>{property.baths} Baths</Typography>
            </Stack>
          </Box>
          <Box mt={3}>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <Item>
                  <Typography>CARD</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item>
                  <GoogleMap location="Rangpur Medical College Hospital, Central Jail, Rangpur, Bangladesh" />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PropertyDetails;
