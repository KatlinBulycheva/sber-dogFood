import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dogFoodApi } from "../../../api/DogFoodApi";
import { getTokenSelector } from "../../../redux/slices/userSlice";
import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import profileStyles from "../../Pages/Profile/Profile.module.css";

export function DeleteProductModal({
  isDeleteProductModalOpen, setIsDeleteProductModalOpen, product
}) {
  const navigate = useNavigate();
  const token = useSelector(getTokenSelector);

  const closeDeleteProductModalHandler = () => {
    setIsDeleteProductModalOpen(false);
  };

  const { mutateAsync, error, isError } = useMutation({
    mutationFn: () => dogFoodApi.deleteProduct(token, product["_id"]),
  });

  const deleteHandler = async () => {
    await mutateAsync();
    navigate(-1);
  };

  return (
    <Modal isOpen={isDeleteProductModalOpen} closeHandler={closeDeleteProductModalHandler}>
      <h4 className={profileStyles.modalTitle}>Хотите удалить продукт?</h4>
      <div className={profileStyles.containerButton}>
        <Button
          type="button"
          onClick={closeDeleteProductModalHandler}
        >
          Отмена
        </Button>
        <Button
          type="button"
          onClick={() => deleteHandler()}
        >
          Удалить
        </Button>
      </div>
      {isError && <p className="error">{error.message}</p>}
    </Modal>
  );
}
