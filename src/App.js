import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { darkTheme } from "./Theme/DarkTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { findCart } from "./component/State/Cart/Action";
import Routers from "./Routers/Routers";
import { getRestaurantByUserId } from "./component/State/Restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
      dispatch(findCart(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (auth.user && token) {
      dispatch(getRestaurantByUserId(token));
    }
  }, [auth.user, token, dispatch]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
