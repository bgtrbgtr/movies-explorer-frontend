function Link(props) {
  return (
    <a
      className={`link ${props.className}`}
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.linkText}
      {props.children}
    </a>
  );
}

export default Link;
