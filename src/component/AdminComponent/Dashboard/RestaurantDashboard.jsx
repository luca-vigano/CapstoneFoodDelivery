import { Grid2 } from "@mui/material";
import React from "react";
import MenuTable from "../Menu/MenuTable";
import OrderTable from "../Orders/OrderTable";

const RestaurantDashboard = () => {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <MenuTable />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <OrderTable />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default RestaurantDashboard;
