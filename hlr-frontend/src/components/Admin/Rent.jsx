import { Box, Stack, Typography, Container } from '@mui/material';
import React from 'react';
import rent from '../../assets/images/property-details.jpg';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const dummyPropertyData = {
  properties: [
    {
      property_id: 1,
      on_rent: true,
      bedrooms: 3,
      bathrooms: 2,
      location: {
        city: 'New York',
        neighborhood: 'Midtown',
        street: '123 Main Street',
      },
    },
    {
      property_id: 2,
      on_rent: false,
      bedrooms: 4,
      bathrooms: 3,
      location: {
        city: 'Los Angeles',
        neighborhood: 'Beverly Hills',
        street: '456 Oak Avenue',
      },
    },
    {
      property_id: 3,
      on_rent: true,
      bedrooms: 2,
      bathrooms: 1,
      location: {
        city: 'Chicago',
        neighborhood: 'Downtown',
        street: '789 Elm Street',
      },
    },
    {
      property_id: 4,
      on_rent: true,
      bedrooms: 5,
      bathrooms: 4,
      location: {
        city: 'San Francisco',
        neighborhood: 'Nob Hill',
        street: '555 Pine Avenue',
      },
    },
  ],
};

const Rent = () => {
  return (
    <Container>
      {dummyPropertyData.properties.map((property) => (
        <Box display={'flex'} justifyContent={'space-between'} key={property.property_id} mb={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '84px', width: '104px' }}>
            <img src={rent} alt="property.jpg" />
            <Stack>
              <Typography ml={3} variant="h6" color="initial">
                Amanda Properties
              </Typography>
              <Typography ml={3} variant="p" color="gray">
                Dhaka, Bangladesh
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="p" color="green" ml={2}>
              {property.on_rent ? 'Rent' : 'Not for Rent'}
            </Typography>
            <Typography variant="p" color="gray" ml={2}>
              {property.bedrooms} Bedrooms
            </Typography>
            <Typography variant="p" color="gray" ml={2}>
              {property.bathrooms} Bathrooms
            </Typography>
            <Typography variant="p" color="gray" ml={2}>
              {property.location.city}
              ,
              {property.location.neighborhood}
              ,
              {property.location.street}
            </Typography>
          </Box>
          <Box>
            <DeleteOutlineRoundedIcon color="warning" />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default Rent;