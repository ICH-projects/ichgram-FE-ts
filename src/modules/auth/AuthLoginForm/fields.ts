import * as Yup from "yup";

import { emailPattern } from "../patterns";

export const defaultValues = {
  email: "",
  password: "",
};

export const fields = {
  email: {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
  }
};

export const registerSchema = Yup.object({
  email: Yup.string()
    .trim()
    .matches(emailPattern.regexp, emailPattern.message)
    .required(),
  password: Yup.string()
    .trim()
    .required()
});