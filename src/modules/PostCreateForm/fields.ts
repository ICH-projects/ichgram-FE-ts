import * as yup from "yup";

export const fields = {
  image: {
    name: "image",
    type: "file",
  },
  comment: {
    name: "comment",
    type: "text",
    placeholder: "Input comment text there...",
  },
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const createPostSchema = yup.object().shape({
  image: yup
    .mixed()
    .required()
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
  // comment: yup.string(),
});

export type FormData = yup.InferType<typeof createPostSchema>;
