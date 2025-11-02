import * as Yup from "yup";

import { emailPattern } from "./patterns";

export const registerSchema = Yup.object({
  email: Yup.string()
    .trim()
    .matches(emailPattern.regexp, emailPattern.message)
    .required(),
  password: Yup.string()
    .trim()
    .required()
});