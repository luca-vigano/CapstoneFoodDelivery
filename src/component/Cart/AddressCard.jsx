import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card, Grid2, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AddressCard = ({
  item,
  showButton,
  handleSelectAddressToDelete,
  handleSelectAddressToCart,
}) => {
  return (
    <Card className="flex flex-col gap-3 p-5 w-64 shadow-lg rounded-md">
      <HomeIcon color="primary" sx={{ fontSize: 40 }} />
      <IconButton
        color="error"
        onClick={() => handleSelectAddressToDelete(item.id)}
      >
        <Delete />
      </IconButton>
      <div className="space-y-3">
        <Typography variant="h6" className="font-semibold">
          <strong>Indirizzo:</strong> {item.streetAddress}
        </Typography>

        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Città:</strong> {item.city}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Stato:</strong> {item.state}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Codice Postale:</strong> {item.postalCode}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Country:</strong> {item.country}
            </Typography>
          </Grid2>
        </Grid2>

        {showButton && (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleSelectAddressToCart(item)}
            sx={{
              marginTop: 2,
              textTransform: "none",
              borderColor: "primary",
              color: "primary",
              "&:hover": {
                backgroundColor: "primary",
                color: "white",
              },
            }}
          >
            Seleziona Indirizzo
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
