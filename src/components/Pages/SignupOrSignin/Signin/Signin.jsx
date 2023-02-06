import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { createSigninFormValidationSchema } from "./validatorSignin";
import stylesSignin from "../SignupOrSignin.module.css";
import { setTokenUser } from "../../../../redux/slices/userSlice";

export function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesSignin = {
    password: "",
    email: "",
  };

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (data) =>
      fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 401) {
          throw new Error(`Неправильные логин или пароль`);
        }

        if (res.status === 404) {
          throw new Error(`Пользователь c указанным email не найден`);
        }
        return res.json();
      }),
  });

  const submitHandler = async (values) => {
    const response = await mutateAsync(values);
    dispatch(setTokenUser(response.token));

    navigate("/");
  };

  return (
    <>
      <Formik
        initialValues={initialValuesSignin}
        validationSchema={createSigninFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={stylesSignin.form}>
          <h3 className={stylesSignin.title}>Вход</h3>

          <div>
            <Field
              name="email"
              placeholder="Эл. почта"
              type="email"
              className={stylesSignin.input}
            />
            <ErrorMessage component="p" className="error" name="email" />
          </div>

          <div>
            <Field
              name="password"
              placeholder="Пароль"
              type="password"
              className={stylesSignin.input}
            />
            <ErrorMessage component="p" className="error" name="password" />
          </div>

          <button type="submit">Войти</button>
        </Form>
      </Formik>
      {isError && <p className="error">{error.message}</p>}
    </>
  );
}
