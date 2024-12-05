import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <CardContent>
          <Typography variant="h5">Burger's House</Typography>
          <Typography variant="body2">Black Friday Event 50%</Typography>
          <div className="py-2 space-y-2">
            <p>{"Milano"}</p>
            <p className="text-sm text-blue-500">22 Novembre 2024, 10.00</p>
            <p className="text-sm text-red-500">23 Novembre 2024, 23.00</p>
          </div>
        </CardContent>
        {true && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
