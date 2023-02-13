import buttonStyles from "./Button.module.css";

export function Button({
  children, type, onClick, disabled
}) {
  return (
    <button
      className={buttonStyles.button}
    // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
