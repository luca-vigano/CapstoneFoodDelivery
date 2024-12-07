import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "RESTAURANT_CUSTOMER",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    console.log("form values", values);

    try {
      await dispatch(registerUser({ userData: values, navigate }));

      // +++++++++++PROVARE A TOGLIERE+++++++++++++++
      await dispatch(loginUser({ userData: values, navigate }));
    } catch (error) {
      console.log("Registrazione o login falliti", error);
    }
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Registrazione
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullname"
            label="full name"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          <Field
            fullWidth
            margin="normal"
            as={Select}
            labelId="role-simple-select-label"
            id="demo-simple-select"
            name="role"
            //   value={age}
            //   onChange={handleChange}
          >
            <MenuItem value={"RESTAURANT_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Registrati
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Sei già registrato?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
