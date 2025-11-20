export const defaultLoginValues = {
  email: "",
  password: "",
};

export const defaultSignupValues = {
  email: "",
  password: "",
  username: null,
  fullname: null,
};

export const defaultResetPasswordValues = {
  email: "",
};

export const defaultUpdatePasswordValues = {
  password: "",
  confirmPassword: "",
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
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
  },
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  fullname: {
    name: "fullname",
    type: "text",
    placeholder: "Fullname",
  },
};
