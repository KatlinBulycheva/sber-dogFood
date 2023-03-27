import * as Yup from 'yup';

export const createSignupFormValidationSchema = Yup.object({
  password: Yup.string()
    .min(5, 'Минимум 5 символов')
    .required('Введите пароль')
    .matches(/[a-zA-Z]/, 'Только латинские символы'),
  email: Yup.string()
    .email("Введите корректный email")
    .required('Введите email'),
  group: Yup.string()
});
