import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid2,
} from "@mui/material";

import HomeCarousel from "./HomeCarousel";
import { RestaurantCard } from "../../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import CustomFooter from "../../Footer/CustomFooter";

export const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(token));
  }, [dispatch, token]);

  return (
    <Box>
      {/* Carousel Section */}
      <Box
        sx={{
          height: "20%",
          width: "100%",
          overflow: "hidden",
          paddingTop: 5,
        }}
      >
        <HomeCarousel />
      </Box>

      {/* Banner Section */}
      <Container>
        <Grid2
          container
          justifyContent="center"
          textAlign="center"
          spacing={2}
          mb={8}
        >
          <Grid2 xs={12}>
            <Typography variant="h3" fontWeight="bold">
              Click Food
            </Typography>
            <Typography variant="h5">Hai fame? Ci pensiamo noi</Typography>
          </Grid2>
        </Grid2>
      </Container>

      {/* Image and Text Section */}
      <Container>
        <Grid2 container spacing={3} mb={8} alignItems="center">
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="250"
                image="https://via.placeholder.com/600x400"
                alt="Cibo"
              />
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Titolo Sezione 1
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={4} mb={6} alignItems="center">
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Titolo Sezione 2
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="250"
                image="https://via.placeholder.com/600x400"
                alt="Cibo"
              />
            </Card>
          </Grid2>
        </Grid2>
      </Container>

      {/* Restaurant Cards */}
      <Container>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Scegli Dove Ordinare
        </Typography>
        <Grid2 container spacing={2}>
          {restaurant.restaurants?.map((item) => (
            <Grid2 size={{ xs: 12, lg: 6 }} key={item.id}>
              <RestaurantCard item={item} />
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* Footer Section */}
      <Box mt={8}>
        <CustomFooter />
      </Box>
    </Box>
  );
};

export default Home;
