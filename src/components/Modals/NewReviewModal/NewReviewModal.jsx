import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ErrorMessage, Field, Formik, Form
} from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeyProduct } from "../../../utils/functions";
import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import profileStyles from "../../Pages/Profile/Profile.module.css";
import { Rate } from "../../Rate/Rate";
import styles from "./NewReviewModal.module.css";
import { createNewProductValidationSchema } from "./validatorNewReview";

export function NewReviewModal({
  isNewReviewModalOpen,
  setIsNewReviewModalOpen,
  id,
  name,
}) {
  const token = useSelector(getTokenSelector);

  const [rating, setRating] = useState(0);
  console.log(">>>>", { rating });

  const closeNewReviewModalHandler = () => {
    setIsNewReviewModalOpen(false);
  };

  const initialValuesNewReview = {
    rating,
    text: "",
  };
  console.log({ initialValuesNewReview });

  const queryClient = useQueryClient();
  const { mutateAsync, error, isError } = useMutation({
    mutationFn: (values) => dogFoodApi.postNewReview(values, token, id),
    onSuccess: () => queryClient.invalidateQueries(getQueryKeyProduct(id)),
  });

  const submitHandler = async (values) => {
    console.log("данные формы", { values });
    await mutateAsync(values);
    setIsNewReviewModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNewReviewModalOpen}
      closeHandler={closeNewReviewModalHandler}
    >
      <h4 className={profileStyles.modalTitle} style={{ width: "300px" }}>
        Отзыв к товару &quot;{name}&quot;
      </h4>
      <Formik
        // options={{
        //   enableReinitialize: true
        // }}
        initialValues={initialValuesNewReview}
        validationSchema={createNewProductValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.containerForm}>
          <div className={styles.containerField}>
            <label htmlFor="rating">Оцените товар</label>
            <Field
              name="rating"
              // value={rating}
              type="number"
              // className={styles.stars}
            />
            <Rate rating={rating} setRating={setRating} />
            <ErrorMessage component="p" name="rating" className="error" />
          </div>

          <div className={styles.containerField}>
            <label htmlFor="text">Расскажите о товаре</label>
            <Field name="text" type="text" as="textarea" />
            <ErrorMessage component="p" name="text" className="error" />
          </div>

          <div className={profileStyles.containerButton}>
            <Button type="button" onClick={closeNewReviewModalHandler}>
              Отмена
            </Button>
            <Button type="submit">Добавить</Button>
          </div>

          {isError && <p className="error">{error.message}</p>}
        </Form>
      </Formik>
    </Modal>
  );
}
