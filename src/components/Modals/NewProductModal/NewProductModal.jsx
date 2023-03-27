import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ErrorMessage, Field, Formik, Form
} from "formik";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeySearch } from "../../../utils/functions";
import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import profileStyles from "../../Pages/Profile/Profile.module.css";
import styles from "./NewProductModal.module.css";
import { createNewProductValidationSchema } from "./validatorNewProduct";

export function NewProductModal({ isNewProductModalOpen, setIsNewProductModalOpen }) {
  const token = useSelector(getTokenSelector);

  const closeNewProductModalHandler = () => {
    setIsNewProductModalOpen(false);
  };

  const initialValuesNewProduct = {
    available: true,
    pictures: "",
    name: "",
    price: 0,
    discount: 0,
    stock: 0,
    wight: "",
    description: "",
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync, error, isError
  } = useMutation({
    mutationFn: (values) => dogFoodApi.postNewProduct(values, token),
    onSuccess: () => queryClient.invalidateQueries(getQueryKeySearch('')),
  });

  const submitHandler = async (values) => {
    setIsNewProductModalOpen(false);
    await mutateAsync(values);
  };

  return (
    <Modal isOpen={isNewProductModalOpen} closeHandler={closeNewProductModalHandler}>
      <h4 className={profileStyles.modalTitle}>Заполните данные товара</h4>
      <Formik
        initialValues={initialValuesNewProduct}
        validationSchema={createNewProductValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.containerForm}>
          <div className={styles.containerCheckbox}>
            <Field
              name="available"
              type="checkbox"
            />
            <label htmlFor="available">
              в наличии
            </label>
          </div>

          <div className={styles.containerField}>
            <label htmlFor="pictures">
              Фото
            </label>
            <Field
              name="pictures"
              type="url"
              placeholder="https://image.jpg"
            />
            <ErrorMessage component="p" name="pictures" className="error" />
          </div>

          <div className={styles.containerField}>
            <label htmlFor="name">
              Название
            </label>
            <Field
              name="name"
              type="text"
              placeholder="Корм для собак 'DogFood'"
            />
            <ErrorMessage component="p" name="name" className="error" />
          </div>

          <div className={styles.containerFields}>
            <div className={styles.containerField}>
              <label htmlFor="price">
                Цена, ₽
              </label>
              <Field
                name="price"
                type="number"
                // placeholder="1200 ₽"
              />
              <ErrorMessage component="p" name="price" className="error" />
            </div>

            <div className={styles.containerField}>
              <label htmlFor="discount">
                Скидка, %
              </label>
              <Field
                name="discount"
                type="number"
                // placeholder="20 %"
              />
              <ErrorMessage component="p" name="discount" className="error" />
            </div>
          </div>

          <div className={styles.containerFields}>
            <div className={styles.containerField}>
              <label htmlFor="stock">
                На складе, шт
              </label>
              <Field
                name="stock"
                type="number"
                // placeholder="10 шт"
              />
              <ErrorMessage component="p" name="stock" className="error" />
            </div>

            <div className={styles.containerField}>
              <label htmlFor="wight">
                Вес
              </label>
              <Field
                name="wight"
                type="text"
                placeholder="100 г"
              />
              <ErrorMessage component="p" name="wight" className="error" />
            </div>
          </div>

          <div className={styles.containerField}>
            <label htmlFor="description">
              Описание
            </label>
            <Field
              name="description"
              type="text"
              as="textarea"
              placeholder="Куриные биточки с добавлением фермерских овощей"
            />
            <ErrorMessage component="p" name="description" className="error" />
          </div>

          <div className={profileStyles.containerButton}>
            <Button
              type="button"
              onClick={closeNewProductModalHandler}
            >
              Отмена
            </Button>
            <Button
              type="submit"
            >
              Сохранить
            </Button>
          </div>

          {isError && <p className="error">{error.message}</p>}
        </Form>
      </Formik>

    </Modal>
  );
}
