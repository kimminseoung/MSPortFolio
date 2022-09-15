import { DefaultTheme } from "styled-components";
const size = {
  mobile: "767px",
  desktop: "768px",
};
export const LightTheme: DefaultTheme = {
  bgColor: "#fff",
  textColor: "#333",
  secondBgColor: "#f6fffb",
  mobile: `(max-width:${size.mobile})`,
  desktop: `(min-width:${size.desktop})`,
};
export const DarkTheme: DefaultTheme = {
  bgColor: "#333",
  textColor: "#fff",
  secondBgColor: "#333",
};

