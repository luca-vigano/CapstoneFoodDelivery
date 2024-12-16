import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import React from "react";

const OrderCard = ({ order }) => {
  const restaurantName = order.items[0]?.food?.restaurant?.name;

  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {restaurantName && (
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{ textAlign: "center", fontSize: "1.2rem" }}
          >
            {restaurantName}
          </Typography>
        )}

        {order.items.map((item, index) => (
          <Grid2 container spacing={1} key={index} alignItems="center">
            <Grid2 size={{ xs: 4, sm: 3, md: 2 }}>
              <CardMedia
                component="img"
                height="100"
                image={item.food.images[0]}
                alt={item.food.name}
                sx={{ borderRadius: 1 }}
              />
            </Grid2>

            <Grid2 size={{ xs: 8, sm: 9, md: 10 }}>
              <Typography variant="body1" color="textSecondary">
                {item.food.name}
              </Typography>
            </Grid2>
          </Grid2>
        ))}

        <Grid2 container alignItems="center" spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Typography
              variant="body1"
              sx={{ display: "inline", fontWeight: "bold" }}
            >
              Totale Ordine:
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{ display: "inline", marginLeft: 1 }}
            >
              € {order.totalAmmount}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>

      <CardContent>
        <Typography color="primary">{order.orderStatus}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
