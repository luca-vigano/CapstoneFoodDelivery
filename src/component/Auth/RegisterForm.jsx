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
import * as Yup from "yup"; // Importa Yup per la validazione

// Aggiungiamo la validazione con Yup
const validationSchema = Yup.object({
  fullname: Yup.string().required("Il nome completo è obbligatorio"),
  email: Yup.string()
    .email("Inserisci una email valida")
    .required("L'email è obbligatoria"),
  password: Yup.string()
    .min(4, "La password deve contenere almeno 6 caratteri")
    .required("La password è obbligatoria"),
  role: Yup.string().required("Seleziona un ruolo"),
});

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="fullname"
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.fullname && Boolean(errors.fullname)}
              helperText={touched.fullname && errors.fullname}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Field
              fullWidth
              margin="normal"
              as={Select}
              labelId="role-simple-select-label"
              id="demo-simple-select"
              name="role"
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value={"RESTAURANT_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type="submit"
              variant="contained"
              disabled={Object.keys(errors).length > 0}
            >
              Registrati
            </Button>
          </Form>
        )}
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
