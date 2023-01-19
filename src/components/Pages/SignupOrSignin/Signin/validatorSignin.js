import * as Yup from 'yup';

export const createSigninFormValidationSchema = Yup.object({
  password: Yup.string()
    .required('Введите пароль'),
  email: Yup.string()
    .email("Введите корректный email")
    .required('Введите email')
});
