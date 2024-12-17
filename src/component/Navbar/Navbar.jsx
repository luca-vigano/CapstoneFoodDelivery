import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { blue } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { searchMenuItem } from "../State/Menu/Action";

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
  search: "",
};

const validationSchema = Yup.object().shape({
  search: Yup.string().required("Street address is required"),
});

export const Navbar = () => {
  const { auth, cart, menu } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpenSearchModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { resetForm }) => {
    const keyword = values.search;
    dispatch(searchMenuItem({ keyword, token }))
      .then(() => {
        resetForm();
        handleClose();
      })
      .catch((error) => console.error("Search failed:", error));
  };

  const handleAvatarClick = () => {
    if (auth.user?.role === "RESTAURANT_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurants");
    }
  };
  console.log("risultati del search", menu.search);
  return (
    <>
      <Box className="px-5 sticky top-0 z-50 py-[.8rem] lg:px-20 flex justify-between">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <li
            onClick={() => navigate("/")}
            className="logo font-semibold text-2xl"
          >
            ClickFood
          </li>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-10">
          <IconButton>
            <SearchIcon
              onClick={handleOpenSearchModal}
              sx={{ fontSize: "1.5rem", color: "#D8BD8A" }}
            />
          </IconButton>
          {auth.user ? (
            <Avatar
              className="cursor-pointer"
              onClick={handleAvatarClick}
              sx={{ bgcolor: "#D8BD8A" }}
            >
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person sx={{ color: "#D8BD8A" }} />
            </IconButton>
          )}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              color="#D8BD8A"
              badgeContent={cart.cartItems ? cart.cartItems.length : 0}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "#D8BD8A" }} />
            </Badge>
          </IconButton>
        </div>
      </Box>
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
                <Field
                  as={TextField}
                  name="search"
                  label="Search"
                  fullWidth
                  variant="outlined"
                  error={touched.search && Boolean(errors.search)}
                  helperText={touched.search && errors.search}
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
