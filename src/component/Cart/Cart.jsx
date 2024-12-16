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
          <Address createOrderUsingSelectedAddress={createUserOrder} />
        </section>
      </main>
    </>
  );
};

export default Cart;
