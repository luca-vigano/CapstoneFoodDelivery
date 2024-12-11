import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Modal, Box, TextField, Card, Grid2 } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
} from "../State/Address/Action"; // Import delle action
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
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.number()
    .typeError("Pincode must be a number")
    .required("Pincode is required"),
  city: Yup.string().required("City is required"),
});

const Address = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { address } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleOpenAddressModal = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress({ id, token }));
    dispatch(getUserAddresses(token));
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
        pincode: values.pincode,
        city: values.city,
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
              {[1, 1, 1].map((item, index) => (
                <AddressCard
                  key={index}
                  handleSelectAddress={handleDeleteAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Nuovo Indirizzo
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
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
                  <Grid2 xs={12}>
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
                  <Grid2 xs={12}>
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
                  <Grid2 xs={12}>
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
                  <Grid2 xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.pincode && Boolean(errors.pincode)}
                      helperText={touched.pincode && errors.pincode}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
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
