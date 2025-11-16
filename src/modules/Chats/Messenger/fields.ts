import * as yup from "yup";

export const defaultValues = {
  text: "",
};

export const fields = {
  text: {
    name: "text",
    type: "text",
    placeholder: "Write text",
  },
};

export const chatSchema = yup.object().shape({
  text: yup.string(),
});

export type FormData = yup.InferType<typeof chatSchema>;
