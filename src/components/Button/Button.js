function Button(props) {
  return (
    <button
      type={props.type ? `${props.type}` : "button"}
      className={`button ${props.className}`}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      {props.buttonText}
      {props.children ? props.children : null}
    </button>
  );
}

export default Button;
