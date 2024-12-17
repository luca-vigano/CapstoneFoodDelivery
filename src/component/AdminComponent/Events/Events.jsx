import {
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  deleteEventAction,
  getAllEvents,
  getRestaurantEvents,
} from "../../State/Restaurant/Action";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import EventCard from "../../Profile/EventCard";
import CreateIcon from "@mui/icons-material/Create";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  name: "",
  description: "",
  startedAt: null,
  endsAt: null,
};

const validationSchema = Yup.object({
  image: Yup.string().required("Image URL is required"),
  location: Yup.string().required("Location is required"),
  name: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Event Description is required"),
  startedAt: Yup.date().required("Start Date and Time is required"),
  endsAt: Yup.date().required("End Date and Time is required"),
});

const Events = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);

  console.log("Restaurant DATA", restaurant);
  const handleSubmit = (values) => {
    dispatch(
      createEventAction({
        data: values,
        restaurantId: restaurant.usersRestaurant?.id,
        token,
      })
    );
    setOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEventAction({ eventId, token })).then(() => {
      dispatch(
        getRestaurantEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          token,
        })
      );
    });
  };

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/admin/restaurants/event") {
      dispatch(
        getRestaurantEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          token,
        })
      );
    } else {
      dispatch(getAllEvents({ token }));
    }
  }, [dispatch, restaurant.usersRestaurant?.id, token]);

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          Events
        </h1>
        {location.pathname.includes("/admin/restaurants/event") && (
          <IconButton onClick={handleOpen} aria-label="create event">
            <CreateIcon sx={{ color: "#D8BD8A" }} />
          </IconButton>
        )}
      </div>

      <Grid2 container spacing={3}>
        {restaurant.restaurantsEvents?.map((event) => (
          <Grid2 item xs={12} sm={6} md={4} key={event.id}>
            <EventCard item={event} onDelete={handleDeleteEvent} />
          </Grid2>
        ))}
      </Grid2>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <Grid2 className="my-3" container spacing={3}>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      name="image"
                      label="Image URL"
                      variant="outlined"
                      fullWidth
                      as={TextField}
                      onChange={handleChange}
                      value={values.image}
                      error={touched.image && Boolean(errors.image)}
                      helperText={touched.image && errors.image}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      name="location"
                      label="Location"
                      variant="outlined"
                      fullWidth
                      as={TextField}
                      onChange={handleChange}
                      value={values.location}
                      error={touched.location && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      name="name"
                      label="Event Name"
                      variant="outlined"
                      fullWidth
                      as={TextField}
                      onChange={handleChange}
                      value={values.name}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      name="description"
                      label="Event Description"
                      variant="outlined"
                      fullWidth
                      as={TextField}
                      multiline
                      rows={4}
                      onChange={handleChange}
                      value={values.description}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date and Time"
                        value={values.startedAt}
                        onChange={(newValue) =>
                          setFieldValue("startedAt", newValue)
                        }
                        className="w-full"
                      />
                    </LocalizationProvider>
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date and Time"
                        value={values.endsAt}
                        onChange={(newValue) =>
                          setFieldValue("endsAt", newValue)
                        }
                        className="w-full"
                      />
                    </LocalizationProvider>
                  </Grid2>
                </Grid2>
                <Button className="my-2" variant="contained" type="submit">
                  Create Event
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;
