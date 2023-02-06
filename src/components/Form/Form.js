import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext, NavContext } from "../../contexts";
import { Button } from "..";

function Form({ name, onSubmit, title, buttonText, children, formState }) {
  const appContext = useContext(AppContext);
  const navContext = useContext(NavContext);
  const isRegistrationOk = appContext.isRegistrationOk;
  const loggedIn = appContext.loggedIn;

  let location = navContext.location;

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
      {location.pathname === "/signup" ? (
        <p
          className={`field-error field-error__submit ${
            isRegistrationOk.status ? "field-error__submit_invisible" : null
          }`}
        >
          {isRegistrationOk.message}
        </p>
      ) : (
        <p
          className={`field-error field-error__submit ${
            loggedIn.status ? "field-error__submit_invisible" : null
          }`}
        >
          {loggedIn.message}
        </p>
      )}
      <Button
        ariaLabel="Отправить данные"
        type="submit"
        className={`form__submit ${formState ? null : "form__submit_disable"}`}
        buttonText={buttonText}
        disabled={!formState}
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
