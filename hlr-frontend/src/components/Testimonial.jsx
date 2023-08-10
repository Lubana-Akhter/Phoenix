import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { BaseURL } from "../core/BaseUrl";
const Testimonial = () => {
  const [data, setData] = useState(null);

  const cardStyles = {
    maxWidth: 263,
    height: "300px",
    margin: "auto",
    backgroundColor: "#00A76F",
    alignItems: "left",
    color: "white",
    padding: "20px 0",
  };

  const avatarStyles = {
    width: "60px",
    height: "60px",
  
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getFatchData();
  }, []);

  const getFatchData = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}/testimonial/list`);
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Container style={{ marginBottom: "30px" }}>
        <Typography
          variant="h3"
          mt={10}
          style={{ color: "green", fontWeight: "bold" }}>
          What Our Clients
        </Typography>
        <Typography variant="h3">Have Said?!</Typography>

        <Grid mt={5}>
          <Slider {...settings}>
            {data &&
              data.map((result) => (
                <div>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card style={cardStyles}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {result.title}
                        </Typography>
                        <Typography variant="subtitle1">
                          {result.feedback}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            marginTop: "16px",
                          }}>
                          <Avatar
                            style={avatarStyles}
                            src="profile_image_url.jpg"
                            alt="Profile"
                            sx={{ bgcolor: deepOrange[500] }}
                          />
                          <div style={{ marginLeft: "16px" }}>
                            <Typography variant="subtitle1">
                              {result.userId?.name}
                            </Typography>
                            <Typography variant="caption">
                              {result.createdAt}
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              ))}

            {/* <div>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      SEQUOIA
                    </Typography>
                    <Typography variant="subtitle1">
                      The world of technology thrives best when individuals are
                      left alone to be different, creative, and disobedient.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "left",
                        marginTop: "16px",
                      }}>
                      <Avatar
                        style={avatarStyles}
                        src="profile_image_url.jpg"
                        alt="Profile"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                      <div style={{ marginLeft: "16px" }}>
                        <Typography variant="subtitle1">
                          Profile Name
                        </Typography>
                        <Typography variant="caption">Date</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      SEQUOIA
                    </Typography>
                    <Typography variant="subtitle1">
                      The world of technology thrives best when individuals are
                      left alone to be different, creative, and disobedient.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "left",
                        marginTop: "16px",
                      }}>
                      <Avatar
                        style={avatarStyles}
                        src="profile_image_url.jpg"
                        alt="Profile"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                      <div style={{ marginLeft: "16px" }}>
                        <Typography variant="subtitle1">
                          Profile Name
                        </Typography>
                        <Typography variant="caption">Date</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      SEQUOIA
                    </Typography>
                    <Typography variant="subtitle1">
                      The world of technology thrives best when individuals are
                      left alone to be different, creative, and disobedient.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "left",
                        marginTop: "16px",
                      }}>
                      <Avatar
                        style={avatarStyles}
                        src="profile_image_url.jpg"
                        alt="Profile"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                      <div style={{ marginLeft: "16px" }}>
                        <Typography variant="subtitle1">
                          Profile Name
                        </Typography>
                        <Typography variant="caption">Date</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={cardStyles}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      SEQUOIA
                    </Typography>
                    <Typography variant="subtitle1">
                      The world of technology thrives best when individuals are
                      left alone to be different, creative, and disobedient.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "left",
                        marginTop: "16px",
                      }}>
                      <Avatar
                        style={avatarStyles}
                        src="profile_image_url.jpg"
                        alt="Profile"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                      <div style={{ marginLeft: "16px" }}>
                        <Typography variant="subtitle1">
                          Profile Name
                        </Typography>
                        <Typography variant="caption">Date</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div> */}
          </Slider>
        </Grid>
      </Container>
    </>
  );
};

export default Testimonial;
