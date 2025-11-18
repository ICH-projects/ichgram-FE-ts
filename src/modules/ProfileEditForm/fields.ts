import * as yup from "yup";

export const defaultValues = {
  website: "",
  about: "",
  username: "",
  avatar: null,
};

export const fields = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  website: {
    name: "website",
    type: "text",
    placeholder: "Website",
  },
  about: {
    name: "about",
    type: "textarea",
    placeholder: "Input about text here...",
  },
  avatar: {
    name: "avatar",
    type: "file",
  },
};

const usernamePattern = {
  regexp: /^[a-zA-Z0-9 ]*$/,
  message: "Special characters are not allowed in Username",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const editProfileSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .max(30)
    .matches(usernamePattern.regexp, usernamePattern.message)
    .nullable(),
  // .required()
  website: yup.string().trim().max(150).nullable(),
  // .required()
  about: yup.string().trim().max(150).nullable(),
  // .required()
  avatar: yup
    .mixed()
    .nullable()
    .required()
    .test("required", "Добавьте аватар", (value) => {
      console.log(value);
      return value && (value as File).size > 0;
    })
    .test("fileSize", "The file required", (file) => {
      return file && (file as File).size > 0;
    })
    .test("fileSize", "The file is too large", (file) => {
      return file && (file as File).size <= MAX_FILE_SIZE;
    })
    .test(
      "fileType",
      "Unsupported file format",
      (file) => file && SUPPORTED_FORMATS.includes((file as File).type)
    ),
});

export type FormData = yup.InferType<typeof editProfileSchema>;
