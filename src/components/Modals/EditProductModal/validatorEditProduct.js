import * as Yup from 'yup';

export const createEditProductValidationSchema = Yup.object({
  available: Yup.boolean(),
  pictures: Yup.string()
    .required("Введите url картинки")
    .url("Введите корректный адрес"),
  name: Yup.string()
    .required("Введите название"),
  price: Yup.number()
    .required("Введите цену")
    .positive("Введите цену"),
  discount: Yup.number()
    .moreThan(-1, "Введите положительное число")
    .integer("Введите целое число"),
  stock: Yup.number()
    .moreThan(-1, "Введите положительное число"),
  wight: Yup.string(),
  description: Yup.string()
});
