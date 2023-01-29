function Link(props) {
  return (
    <a
      className={`link ${props.className}`}
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.linkText}
    </a>
  );
}

export default Link;
