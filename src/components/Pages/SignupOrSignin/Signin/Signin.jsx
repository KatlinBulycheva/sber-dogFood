import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { createSigninFormValidationSchema } from "./validatorSignin";
import stylesSignin from "../SignupOrSignin.module.css";
import { AppContext } from "../../../../context/DogFoodContextProvider";

const initialValuesSignin = {
  password: '',
  email: '',
};

export function Signin() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => res.json()),
  });

  const { setToken } = useContext(AppContext);

  const submitHandler = async (values) => {
    const response = await mutateAsync(values);
    console.log({ response });

    setToken(response.token);

    navigate('/');
  };

  return (
    <Formik
      initialValues={initialValuesSignin}
      validationSchema={createSigninFormValidationSchema}
      onSubmit={submitHandler}
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
