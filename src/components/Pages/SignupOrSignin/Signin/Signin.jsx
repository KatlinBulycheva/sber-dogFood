import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { createSigninFormValidationSchema } from "./validatorSignin";
import stylesSignin from "../SignupOrSignin.module.css";

const initialValuesSignin = {
  password: '',
  email: '',
};

export function Signin() {
  return (
    <Formik
      initialValues={initialValuesSignin}
      validationSchema={createSigninFormValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className={stylesSignin.form}>
        <div className={stylesSignin.title}>Вход</div>

        <div>
          <Field name="password" placeholder="Пароль" type="text" className={stylesSignin.input} />
          <ErrorMessage component="p" className="error" name="password" />
        </div>

        <div>
          <Field name="email" placeholder="Эл. почта" type="email" className={stylesSignin.input} />
          <ErrorMessage component="p" className="error" name="email" />
        </div>

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  );
}
