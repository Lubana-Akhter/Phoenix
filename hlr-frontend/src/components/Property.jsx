import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import { Link } from "react-router-dom";
import { BaseURL } from "../core/BaseUrl";
import axios from "axios";

const Property = (props) => {
  const { propertyTitle } = props;
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    getFatchData();
  }, []);

  const getFatchData = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}/property/list`);
      setCardData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        {/* <Typography variant="h3" style={{ color: "green", fontWeight: "bold" }}>
          {propertyTitle.title1}
        </Typography>
        <Typography variant="h3">{propertyTitle.title2}</Typography> */}
        <Grid container spacing={2} mt={5}>
          {cardData.map((card) => (
            <Grid key={card._id} item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={card.images[0]}
                  alt="Image"
                />
                <CardContent>
                  <Link to={`/property-details?id=${card._id}`}>
                    <Typography gutterBottom variant="h6" component="div">
                      {card.name}
                    </Typography>
                  </Link>
                  <Stack direction="row" spacing={20}>
                    <IconButton aria-label="Love">
                      <RoomIcon />
                    </IconButton>

                    <IconButton aria-label="Love" style={{ color: "red" }}>
                      <FavoriteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Property;
