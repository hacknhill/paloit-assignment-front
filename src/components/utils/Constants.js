import { createMuiTheme } from "@material-ui/core/styles";

export const BACKEND_SERVICE = "http://localhost:8080/api/";
export const ORDERS_SERVICE = BACKEND_SERVICE + "orders";
export const GET_JSON = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};
export const UI_THEMES = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        subtitle1: "h2",
        subtitle2: "h3",
        body1: "span",
        body2: "span",
      },
    },
  },
});
