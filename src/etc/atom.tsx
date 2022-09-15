import { atom } from "recoil";

export const DarkModeValue = atom({
  key: "DarkMode",
  default: false,
});
export const OpenMobileMenu = atom({
  key: "OpenMobileMenu",
  default: false,
});
export const ModalText = atom({
  key: "ModalText",
  default: "",
});
