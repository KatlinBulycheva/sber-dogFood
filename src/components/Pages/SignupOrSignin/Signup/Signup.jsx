import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSignupFormValidationSchema } from "./validatorSignup";
import stylesSignup from "../SignupOrSignin.module.css";
import { dogFoodApi } from "../../../../api/DogFoodApi";

export function Signup() {
  const navigate = useNavigate();

  const initialValuesSignup = {
    password: "",
    email: "",
    group: "",
  };

  const { mutateAsync, error, isError } = useMutation({
    mutationFn: (values) => dogFoodApi.signUp(values),
  });

  const submitHandler = async (values) => {
    await mutateAsync(values);
    navigate("/signin");
  };

  return (
    <>
      <Formik
        initialValues={initialValuesSignup}
        validationSchema={createSignupFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={stylesSignup.form}>
          <h3 className={stylesSignup.title}>Регистрация</h3>

          <div>
            <Field
              name="group"
              placeholder="Группа"
              type="text"
              className={stylesSignup.input}
            />
            <ErrorMessage component="p" className="error" name="group" />
          </div>

          <div>
            <Field
              name="email"
              placeholder="Эл. почта"
              type="email"
              className={stylesSignup.input}
            />
            <ErrorMessage component="p" className="error" name="email" />
          </div>

          <div>
            <Field
              name="password"
              placeholder="Пароль"
              type="password"
              className={stylesSignup.input}
            />
            <ErrorMessage component="p" className="error" name="password" />
          </div>

          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
      {isError && <p className="error">{error.message}</p>}
    </>
  );
}
