import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart, menu } = useSelector((store) => store);

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#D8BD8A" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#53272F",
                color: "##D8BD8A",
              },
            }}
          />
          <Field
            as={TextField}
            name="password"
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            InputLabelProps={{
              style: { color: "#D8BD8A" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#53272F",
                color: "##D8BD8A",
              },
            }}
          />
          <Button
            sx={{ mt: 2, padding: "1rem", color: "#D8BD8A" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Non sei registato?
        <Button
          size="small"
          sx={{ color: "#D8BD8A" }}
          onClick={() => navigate("/account/register")}
        >
          Registrati
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
