import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const AddressCard = ({
  item,
  showButton,
  handleSelectAddressToDelete,
  handleSelectAddressToCart,
}) => {
  return (
    <Card
      className="flex flex-col gap-3 p-5 w-64 rounded-md"
      sx={{ backgroundColor: "#753742" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HomeIcon color="secondary" sx={{ fontSize: 40 }} />

        <IconButton onClick={() => handleSelectAddressToDelete(item.id)}>
          <Delete sx={{ color: "#AA5042" }} />
        </IconButton>
      </Box>

      <div className="space-y-3">
        <Typography variant="h6" className="font-semibold">
          <strong>Street Address: </strong> {item.streetAddress}
        </Typography>

        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="p" color="secondary">
              City: {item.city}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="p" color="secondary">
              State: {item.state}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="p" color="secondary">
              Postal Code: {item.postalCode}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="p" color="secondary">
              Country: {item.country}
            </Typography>
          </Grid2>
        </Grid2>

        {showButton && (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handleSelectAddressToCart(item)}
            sx={{
              marginTop: 2,
              textTransform: "none",
              borderColor: "secondary",
              color: "secondary",
              "&:hover": {
                backgroundColor: "secondary",
                color: "secondary",
              },
            }}
          >
            Select Address
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
