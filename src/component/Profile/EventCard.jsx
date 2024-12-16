import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const EventCard = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("it-IT", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 450,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader title={item.name} subheader={item.restaurant.name} />
        <CardMedia
          component="img"
          height="194"
          image={item.image}
          alt="event"
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.location}
          </Typography>

          <Typography variant="body2" sx={{ color: "#4354EB" }}>
            {formatDate(item.startedAt)}
          </Typography>
          <Typography variant="body2" sx={{ color: "#CD524E" }}>
            {formatDate(item.endsAt)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {location.pathname.includes("/admin/restaurants/event") && (
            <IconButton aria-label="delete button" color="error">
              <DeleteIcon />
            </IconButton>
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>Description:</Typography>
            <Typography sx={{ marginBottom: 2 }}>{item.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default EventCard;
