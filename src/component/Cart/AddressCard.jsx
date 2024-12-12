import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card, Grid2, Typography } from "@mui/material";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex flex-col gap-3 p-5 w-64 shadow-lg rounded-md">
      <HomeIcon color="primary" sx={{ fontSize: 40 }} />
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
        </Grid2>

        {showButton && (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => handleSelectAddress(item.id)}
            sx={{
              marginTop: 2,
              textTransform: "none",
              borderColor: "red",
              color: "red",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Elimina
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
