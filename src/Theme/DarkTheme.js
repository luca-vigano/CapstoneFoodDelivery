const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#753742",
    },
    secondary: {
      main: "#D8D78F",
    },
    background: {
      default: "#753742",
      paper: "#753742",
    },
    text: {
      primary: "#D8BD8A",
      secondary: "#AA5042",
      disabled: "#7C7C7C",
    },
  },
});
