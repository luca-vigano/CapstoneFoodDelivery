import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import Address from "../Profile/Address";
import { clearCartAction } from "../State/Cart/Action";

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

// const initialValues = {
//   streetAddress: "",
//   state: "",
//   pincode: "",
//   city: "",
// };
// const validationSchema = Yup.object().shape({
//   streetAddress: Yup.string().required("Street address is required"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.number().required("Pincode is required"),
//   city: Yup.string().required("City is required"),
// });

const Cart = () => {
  // const handleOpenAddressModal = () => setOpen(true);
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);

  const calculateTotal = () => {
    if (!cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const createUserOrder = (addressData) => {
    const data = {
      token: localStorage.getItem("token"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: addressData.streetAddress,
          city: addressData.city,
          state: addressData.state,
          postalCode: addressData.postalCode,
          country: addressData.country,
        },
      },
    };
    dispatch(createOrder(data));
    // dispatch(clearCartAction());

    console.log("addres data from card", addressData);
  };

  // const handleSubmit = (values) => {
  //   const data = {
  //     token: localStorage.getItem("token"),
  //     order: {
  //       restaurantId: cart.cartItems[0].food?.restaurant.id,
  //       deliveryAddress: {
  //         fullName: auth.user?.fullName,
  //         streetAddress: values.streetAddress,
  //         city: values.city,
  //         state: values.state,
  //         postalCode: values.pincode,
  //         country: "Italia",
  //       },
  //     },
  //   };
  //   dispatch(createOrder(data));
  //   console.log("form value", values);
  // };
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Dettagli</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Totale</p>
                <p>€{calculateTotal()}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Spese di consegna</p>
                <p>€3</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Spese di gestione</p>
                <p>€2</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Totale carrello</p>
              <p>€{calculateTotal() === 0 ? 0 : calculateTotal() + 3 + 2}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          {/* <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Seleziona Indirizzo di Consegna
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
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
          </div> */}
          <Address createOrderUsingSelectedAddress={createUserOrder} />
        </section>
      </main>
      {/* <Modal
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
            <Form>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg) => <span className="text-red-600">{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg) => <span className="text-red-600">{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg) => <span className="text-red-600">{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    //   error={!ErrorMessage("streetAddress")}
                    //   helperText={
                    //     <ErrorMessage>
                    //       {(msg) => <span className="text-red-600">{msg}</span>}
                    //     </ErrorMessage>
                    //   }
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
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
          </Formik>
        </Box>
      </Modal> */}
    </>
  );
};

export default Cart;
