import { Link, useLocation } from "react-router-dom";
import { Button } from "..";

function Form({ name, onSubmit, title, buttonText, children }) {
  let location = useLocation();

  return (
    <form
      action="#"
      className="form"
      name={name}
      method="post"
      onSubmit={onSubmit}
    >
      <h2 className="form__heading">{title}</h2>
      {children}
      <Button
        ariaLabel="Отправить данные"
        type="submit"
        className="form__submit"
        buttonText={buttonText}
      />
      {location.pathname === "/signup" ? (
        <div className="form__option-box">
          <p className="form__option-capture">Уже зарегистрированы?</p>
          <Link className="form__option-link" to={"../signin"}>
            Войти
          </Link>
        </div>
      ) : (
        <div className="form__option-box">
          <p className="form__option-capture">Ещё не зарегистрированы?</p>
          <Link className="form__option-link" to={"../signup"}>
            Регистрация
          </Link>
        </div>
      )}
    </form>
  );
}

export default Form;
