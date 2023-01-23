import {
  Formik, Form, Field, ErrorMessage
} from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSignupFormValidationSchema } from "./validatorSignup";
import stylesSignup from "../SignupOrSignin.module.css";

const initialValuesSignup = {
  password: '',
  email: '',
};

export function Signup() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => res.json()),
  });

  const submitHandler = async (values) => {
    console.log({ values });
    const response = await mutateAsync(values);
    console.log({ response });

    navigate('/signin');
  };

  return (
    <Formik
      initialValues={initialValuesSignup}
      validationSchema={createSignupFormValidationSchema}
      onSubmit={submitHandler}
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
