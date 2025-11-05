import * as yup from "yup";

export const defaultValues = {
  comment: "",
};

export const fields = {
  comment: {
    name: "comment",
    type: "text",
    placeholder: "Input comment text there...",
  }
};

// const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const commentSchema = yup.object().shape({
  // image: yup.mixed().required()
  // .test("required", "You need to provide a file", (file) => {
  //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
  //   if (file) return true;
  //   return false;
  // })
  // .test("fileSize", "The file is too large", (file) => {
  //   //if u want to allow only certain file sizes
  //   return file && file.size <= 2000000;
  // })
  // .test(
  //   "fileType",
  //   "Unsupported file format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
  // content: yup.string().min(0),
  // title: yup.string().min(0),
  // image: yup.mixed().required("A file is required"),
});