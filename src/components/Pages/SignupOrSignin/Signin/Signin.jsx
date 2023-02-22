import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { createSigninFormValidationSchema } from "./validatorSignin";
import stylesSignin from "../SignupOrSignin.module.css";
import {
  setDataUser,
  setTokenUser,
} from "../../../../redux/slices/userSlice";
import { dogFoodApi } from "../../../../api/DogFoodApi";

export function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesSignin = {
    password: "",
    email: "",
  };

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values),
  });

  const submitHandler = async (values) => {
    const response = await mutateAsync(values);
    dispatch(setTokenUser(response.token));
    dispatch(setDataUser(response.data));

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
