import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { Navbar } from "./component/Navbar/Navbar";
import { darkTheme } from "./Theme/DarkTheme";
import { Home } from "./component/Navbar/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import CustomerRoute from "./Routers/CustomerRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { store } from "./component/State/store";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);
  console.log("auth from store:", auth);
  console.log("jwt from localStorage:", token);

  useEffect(() => {
    if (auth.token || token) {
      dispatch(getUser(auth.token || token));
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
