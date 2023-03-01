import classNames from "classnames";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function ModalInner({ closeHandler, children }) {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    };

    document.addEventListener("keydown", closeModalByEscape);

    return () => {
      document.removeEventListener("keydown", closeModalByEscape);
    };
  }, []);

  const closeModalByClickButton = () => closeHandler();

  return (
    <div className={styles.modalInner}>
      <i
        className={classNames(
          "fa-solid fa-xmark",
          { [styles.closeIcon]: true }
        )}
        onClick={closeModalByClickButton}
      />
      {children}
    </div>
  );
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalWr}>
      <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
    </div>,
    document.getElementById("root-modal")
  );
}
