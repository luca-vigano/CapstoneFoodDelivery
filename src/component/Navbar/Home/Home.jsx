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
            {/* <Typography variant="h5">Are You Hungry</Typography> */}
          </Grid2>
        </Grid2>
      </Container>

      {/* Image and Text Section */}
      <Container>
        <Grid2 container spacing={3} mb={8} alignItems="center">
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Card sx={{ borderRadius: 4, overflow: "hidden", maxWidth: 600 }}>
              <CardMedia
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: 400,
                  maxWidth: 600,
                }}
                image="https://files.oaiusercontent.com/file-LyuU9igsMafZh1mwq849or?se=2024-12-17T19%3A57%3A41Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D701f865f-9aca-44e3-99bd-25200ecb7028.webp&sig=yiMvgmFpIkeMXxru4coLj0pMTMklyVWhUURm9AaXaXU%3D"
                alt="Cibo"
              />
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Are You Hungry??
            </Typography>
            <Typography variant="h6">
              With our food delivery app, we take care of everything! All you
              need to do is choose your favorite dish with just a few clicks
              from the comfort of your couch, and we’ll handle the rest: from
              preparation to fast and reliable delivery, straight to your door.
              Sit back, relax, and enjoy the moment—your food is just one click
              away!
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={4} mb={6} alignItems="center">
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Do You Have Your Own Business?
            </Typography>
            <Typography variant="h6">
              Easily register your business in just a few steps and gain access
              to a practical and user-friendly dashboard. Manage your orders,
              menu, ingredients, and photos effortlessly, all in one place.
              Simplify your operations and focus on growing your business while
              we take care of the tools you need!
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Card sx={{ borderRadius: 4, overflow: "hidden", maxWidth: 600 }}>
              <CardMedia
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: 400,
                  maxWidth: 600,
                }}
                image="https://files.oaiusercontent.com/file-Uew5vBZXunz1ZtSFpEvVN9?se=2024-12-17T19%3A54%3A30Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db8f71bfc-51cd-4986-b316-63edbbefa34c.webp&sig=WeQ2JARcGgNk/Z/xg87p5u1DgfNFJQxW8%2BL6aQyfF6k%3D"
                alt="Cibo"
              />
            </Card>
          </Grid2>
        </Grid2>
      </Container>

      {/* Restaurant Cards */}
      <Container>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Choose Where To Order
        </Typography>
        <Grid2 container spacing={6}>
          {restaurant.restaurants?.map((item) => (
            <Grid2 size={{ xs: 12, lg: 3 }} key={item.id}>
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
