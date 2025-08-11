import "./Button.scss";

const Button = ({ onClick, type, size, children, templete, className }) => {
  let buttonClass = "button";
  if (templete) {
    buttonClass += ` ${templete}`;
  } else {
    buttonClass += ` primary`;
  }
  if (size) {
    buttonClass += ` ${size}`;
  } else {
    buttonClass += ` medium`;
  }
  buttonClass += ` ${className}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
