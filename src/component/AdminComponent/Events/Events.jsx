import { Box, Button, Grid2, Modal, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../State/Restaurant/Action";

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
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", formValues);
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        token,
      })
    );
    setFormValues(initialValues);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  // const handleDateChange = (date, dateType) => {
  //   const formatedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
  //   setFormValues({ ...formValues, [dateType]: formatedDate });
  // };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  return (
    <div>
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid2 className="my-3" container spacing={3}>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    name="image"
                    label="image URL"
                    variant="outlined"
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startedAt")
                      }
                      // inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={formValues.endsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      // inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid2>
              </Grid2>
              <Button className="my-2" variant="contained" type="submit">
                Create Ingredient Category
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
