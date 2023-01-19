import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { createSignupFormValidationSchema } from "./validatorSignup";
import stylesSignup from "../SignupOrSignin.module.css";

const initialValuesSignup = {
  password: '',
  email: '',
};

export function Signup() {
  return (
    <Formik
      initialValues={initialValuesSignup}
      validationSchema={createSignupFormValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className={stylesSignup.form}>
        <div className={stylesSignup.title}>Регистрация</div>

        <div>
          <Field name="password" placeholder="Пароль" type="text" className={stylesSignup.input} />
          <ErrorMessage component="p" className="error" name="password" />
        </div>

        <div>
          <Field name="email" placeholder="Эл. почта" type="email" className={stylesSignup.input} />
          <ErrorMessage component="p" className="error" name="email" />
        </div>

        <div>
          <Field name="group" placeholder="Группа" type="text" className={stylesSignup.input} />
          <ErrorMessage component="p" className="error" name="group" />
        </div>

        <button type="submit">Зарегистрироваться</button>
      </Form>
    </Formik>
  );
}
