import { Divider } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";
import Address from "../Profile/Address";

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

const Cart = () => {
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

    console.log("addres data from card", addressData);
  };

  return (
    <>
      <Divider sx={{ bgcolor: "#D8BD8A" }} />
      <main className="lg:flex justify-between">
        <section
          className="lg:w-[20%] space-y-3 lg:min-h-screen pt-10"
          style={{ backgroundColor: "#53272F" }}
        >
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider sx={{ bgcolor: "#D8BD8A" }} />
          <div>
            <p className=" text-lg font-bold px-4 mb-3">DETAILS:</p>
            <Divider sx={{ bgcolor: "#D8BD8A" }} />
            <div className="space-y-3">
              <div className="flex justify-between font-bold mt-2 px-5">
                <p>Totale</p>
                <p>€{calculateTotal()}</p>
              </div>
              <div className="flex justify-between font-semibold px-5">
                <p>Delivery</p>
                <p>€3</p>
              </div>
              <div className="flex justify-between font-bold px-5">
                <p>App Fee</p>
                <p>€2</p>
              </div>
              <Divider sx={{ bgcolor: "#D8BD8A" }} />
            </div>
            <div className="flex justify-between font-bold px-5 pt-3">
              <p>Total Cart:</p>
              <p>€{calculateTotal() === 0 ? 0 : calculateTotal() + 3 + 2}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#D8BD8A" }} />
        <section
          className="lg:w-[80%] flex justify-center px-5 pb-10 lg:pb-0"
          style={{ backgroundColor: "#53272F" }}
        >
          <Address createOrderUsingSelectedAddress={createUserOrder} />
        </section>
      </main>
    </>
  );
};

export default Cart;
