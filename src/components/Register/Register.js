import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "..";
import { NavContext } from "../../contexts";
import logoSvg from "../../images/logo.svg";
import Joi from "joi-browser";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navContext = useContext(NavContext);

  const onSubmit = ({ name, email, password }) => {
    navContext.onRegistration({ name, email, password });
  };

  return (
    <div className="signup">
      <Link className="header__logo signup__header-logo" to={"/"}>
        <img className="signup__logo" alt="Main logo" src={logoSvg} />
      </Link>
      <Form
        name="signup-form"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit(onSubmit)}
        className="signup__form"
        formState={isValid}
      >
        <span className="signup__form-input-caption">Имя</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register("name", {
              required: "Укажите имя",
              minLength: {
                value: 2,
                message: "Имя должно содержать 2 и более символов",
              },
              maxLength: {
                value: 30,
                message: "Имя должно быть короче 30 символов",
              },
              onChange: (e) => console.log(e.target.validity.valid),
            })}
            type="text"
            className="signup__form-input"
          ></input>
          {errors.name && (
            <span className="field-error field-error__signup">
              {errors.name.message}
            </span>
          )}
        </div>
        <span className="signup__form-input-caption">E-mail</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register("email", {
              required: "Укажите почту",
              validate: (value) => {
                const result = Joi.validate(value, Joi.string().email());
                return result.error ? "Укажите корректную почту" : null;
              },
            })}
            className="signup__form-input"
          ></input>
          {errors.email && (
            <span className="field-error field-error__signup">
              {errors.email.message}
            </span>
          )}
        </div>
        <span className="signup__form-input-caption">Пароль</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register("password", { required: "Укажите пароль" })}
            className="signup__form-input signup__form-input-third"
            type="password"
          ></input>
          {errors.password && (
            <span className="field-error field-error__signin-password">
              {errors.password.message}
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Register;
