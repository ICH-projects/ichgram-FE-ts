import * as yup from "yup";

import {
  emailPattern,
  usernamePattern,
  fullnamePattern,
  passwordPattern,
} from "./patterns";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(emailPattern.regexp, emailPattern.message)
    .required(),
  password: yup.string().trim().required(),
});

export const signupSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(emailPattern.regexp, emailPattern.message)
    .required(),
  password: yup
    .string()
    .trim()
    .matches(passwordPattern.regexp, passwordPattern.message)
    .required(),
  username: yup
    .string()
    .trim()
    .matches(usernamePattern.regexp, usernamePattern.message)
    .nullable(),
  fullname: yup
    .string()
    .trim()
    .matches(fullnamePattern.regexp, fullnamePattern.message)
    .nullable(),
});

// export type LoginFormData = yup.InferType<typeof loginSchema>;
// export type SignupFormData = yup.InferType<typeof signupSchema>;
