import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { darkTheme } from "./Theme/DarkTheme";
import CustomerRoute from "./Routers/CustomerRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { findCart } from "./component/State/Cart/Action";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (auth.token || token) {
      dispatch(getUser(auth.token || token));
      dispatch(findCart(token));
    }
  }, [auth.token, token, dispatch]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRoute />
    </ThemeProvider>
  );
}

export default App;
