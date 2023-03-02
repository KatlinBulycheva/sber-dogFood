import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import profileStyles from "../../Pages/Profile/Profile.module.css";

export function ExitModal({
  isExitModalOpen, setIsExitModalOpen, exitHandler
}) {
  const closeExitModalHandler = () => {
    setIsExitModalOpen(false);
  };

  return (
    <Modal isOpen={isExitModalOpen} closeHandler={closeExitModalHandler}>
      <h4 className={profileStyles.modalTitle}>Хотите выйти?</h4>
      <div className={profileStyles.containerButton}>
        <Button
          type="button"
          onClick={closeExitModalHandler}
        >
          Отмена
        </Button>
        <Button
          type="button"
          onClick={() => exitHandler()}
        >
          Выйти
        </Button>
      </div>

    </Modal>
  );
}
