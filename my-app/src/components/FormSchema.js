import * as yup from 'yup'

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Username must be at least 8 characters")
    .required("Username is Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
})

export default formSchema;