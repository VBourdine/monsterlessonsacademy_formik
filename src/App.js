import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

const App = () => {
  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  };
  const onSubmit = (values) => {
    console.log("onSubmit", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string()
      /* (  # Start of group
(?=.*\d)    # must contains one digit from 0-9
(?=.*[a-z]) # must contains one lowercase characters
(?=.*[\W])  # must contains at least one special character
.           # match anything with previous condition checking
{5,20}      # length at least 5 characters and maximum of 20 
)           # End of group */
      .matches(/(?=.*\d)/, "Passwort muss eine Zahl enthalten!")
      .matches(
        /(?=.*[a-zA-Z])/,
        "Passwort muss einen Klein- oder Großbuchstaben enthalten!"
      )
      .matches(/(?=.*[\W])/, "Passwort muss ein Sonderzeichen enthalten!")
      .matches(/(.{5,20})/, "Passwort muss 5-20 Zeichen lang sein!")
      .required("Password is required"),
    username: Yup.string().required("Username is required"),
    passwordCheck: Yup.mixed().oneOf([Yup.ref("password")], "Passwörter müssen gleich sein!"
    )
  })
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     username: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log("onSubmit", values);
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .required("Email is required")
  //       .email("Invalid email adress"),
  //     password: Yup.string().required("Password is required"),
  //     username: Yup.string().required("Username is required"),
  //   }),
  // validate: (values) => {
  //   const errors = {};
  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   }
  //   if (!values.username) {
  //     errors.username = "Username is required";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   }
  //   return errors;
  // },
  // });
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div className="field">
              <Field name="email" placeholder="Email" />

              <div className="error">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <Field name="username" placeholder="Username" />
              <div className="error">
                <ErrorMessage name="username" component="span" />
              </div>
            </div>
            <div className="field">
              <Field name="password" placeholder="Password" type="password" />
              <div className="error">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <div className="field">
              <Field name="passwordCheck" placeholder="Password check" type="password" />
              <div className="error">
                <ErrorMessage name="passwordCheck" component="span" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
