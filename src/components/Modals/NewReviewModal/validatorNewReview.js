import * as Yup from 'yup';

export const createNewProductValidationSchema = Yup.object({
  rating: Yup.number(),
  text: Yup.string()
    .required("Напишите отзыв"),
});
