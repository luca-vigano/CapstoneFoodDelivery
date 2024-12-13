import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Modal,
  Box,
  TextField,
  Card,
  Grid2,
  Typography,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
} from "../State/Address/Action";
import AddressCard from "../Cart/AddressCard";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
  country: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.number()
    .typeError("postalCode must be a number")
    .required("postalCode is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("country is requred"),
});

const Address = ({ createOrderUsingSelectedAddress }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { addresses } = useSelector((store) => store.address);
  const token = localStorage.getItem("token");

  console.log("address from store", addresses);

  const handleOpenAddressModal = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteAddress = (id) => {
    console.log("item passato da card", id);

    dispatch(deleteAddress({ id, token })).then(() => {
      dispatch(getUserAddresses(token));
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserAddresses(token));
    }
  }, [dispatch, token]);

  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token");
    const reqData = {
      token,
      address: {
        streetAddress: values.streetAddress,
        state: values.state,
        postalCode: values.postalCode,
        city: values.city,
        country: values.country,
      },
    };

    dispatch(createAddress(reqData));
    dispatch(getUserAddresses(token));
    handleClose();
    resetForm();
  };

  return (
    <>
      <main>
        <section className="flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              I tuoi indirizzi
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {addresses.map((item, index) => (
                <AddressCard
                  key={index}
                  handleSelectAddressToDelete={handleDeleteAddress}
                  handleSelectAddressToCart={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex flex-col gap-5 p-5 w-64 shadow-lg rounded-md">
                <AddLocationAltIcon color="primary" sx={{ fontSize: 40 }} />
                <div className="space-y-3">
                  <Typography variant="h6" className="font-semibold">
                    Nuovo Indirizzo
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Aggiungi un nuovo indirizzo al tuo profilo.
                  </Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleOpenAddressModal}
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
                    Aggiungi Indirizzo
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
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
            {({ errors, touched }) => (
              <Form>
                <Grid2 container spacing={2}>
                  {/* Street Address */}
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={
                        touched.streetAddress && Boolean(errors.streetAddress)
                      }
                      helperText={touched.streetAddress && errors.streetAddress}
                    />
                  </Grid2>

                  {/* State */}
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Grid2>

                  {/* City */}
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid2>

                  {/* Postal Code */}
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Postal Code"
                      fullWidth
                      variant="outlined"
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />
                  </Grid2>

                  {/* Country */}
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="country"
                      label="Country"
                      fullWidth
                      variant="outlined"
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                    />
                  </Grid2>

                  {/* Save Button */}
                  <Grid2 size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      Salva
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Address;
