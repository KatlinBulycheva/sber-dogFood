import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ErrorMessage, Field, Formik, Form
} from "formik";
import { useSelector } from "react-redux";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { getQueryKeyReviewsByProductId } from "../../../utils/functions";
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

  const closeNewReviewModalHandler = () => {
    setIsNewReviewModalOpen(false);
  };

  const initialValuesNewReview = {
    rating: 0,
    text: "",
  };

  const queryClient = useQueryClient();
  const { mutateAsync, error, isError } = useMutation({
    mutationFn: (values) => dogFoodApi.postNewReview(values, token, id),
    onSuccess: () => queryClient.invalidateQueries(getQueryKeyReviewsByProductId(id)),
  });

  const submitHandler = async (values) => {
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
        initialValues={initialValuesNewReview}
        validationSchema={createNewProductValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.containerForm}>
          <div className={styles.containerField}>
            <label htmlFor="rating">Оцените товар</label>
            <Rate />
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
