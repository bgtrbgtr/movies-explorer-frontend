import { Button } from "..";
import { Link } from "react-router-dom";
import logoSvg from "../../images/logo.svg";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

function Header({ onPopupOpen }) {
  const context = useContext(AppContext);

  return (
    <header
      className={
        context.location.pathname === "/" ? "header main__header" : "header"
      }
    >
      <Link className="header__logo" to={"/"}>
        <img alt="Main logo" src={logoSvg} />
      </Link>
      {context.loggedIn ? (
        <>
          <div className="header_visible">
            <Link to={"/movies"} className="header__link">
              <Button
                className={
                  context.location.pathname === "/"
                    ? "header__button header__button_type_signed-bold header__button_color_white"
                    : "header__button header__button_type_signed-bold"
                }
                buttonText="Фильмы"
              />
            </Link>
            <Link to={"/saved-movies"} className="header__link">
              <Button
                className={
                  context.location.pathname === "/"
                    ? "header__button header__button_type_signed-bold header__button_color_white"
                    : "header__button header__button_type_signed-bold"
                }
                buttonText="Сохраненные фильмы"
              />
            </Link>
            <Link to={"/profile"} className="header__link">
              <Button
                className={
                  context.location.pathname === "/"
                    ? "header__button header__button_type_signed-bold header__button_color_white"
                    : "header__button header__button_type_signed-bold"
                }
                buttonText="Аккаунт"
              />
            </Link>
            <Link to={"/profile"} className="header__link">
              <Button className="header__button header__button_type_icon" />
            </Link>
          </div>
          <Button
            onClick={onPopupOpen}
            className="header__burger-menu"
          ></Button>
        </>
      ) : (
        <>
          <Link to={"signup"} className="header__link">
            <Button
              className="header__button header__button_color_transparent"
              buttonText="Регистрация"
            />
          </Link>
          <Link to={"signin"} className="header__link">
            <Button
              className="header__button header__button_color_green"
              buttonText="Войти"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
