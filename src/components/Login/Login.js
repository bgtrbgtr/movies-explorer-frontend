import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "..";
import logoSvg from "../../images/logo.svg";
import { NavContext } from "../../contexts";
import { useContext, useEffect } from "react";
import Joi from "joi-browser";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navContext = useContext(NavContext);

  const onSubmit = ({ email, password }) => {
    navContext.onLogin({ email, password });
  };
  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {}, []);

  return (
    <>
      {localStorage.getItem("jwt") ? (
        <Navigate to={"/"} replace={true} />
      ) : null}
      <div className="signup">
        <Link className="header__logo" to={"/"}>
          <img className="signup__logo" alt="Main logo" src={logoSvg} />
        </Link>
        <Form
          name="signup-form"
          title="Рады видеть!"
          buttonText="Войти"
          onSubmit={handleSubmit(onSubmit, onError)}
          className="signup__form"
          formState={isValid}
        >
          <span className="signup__form-input-caption">E-mail</span>
          <div className="signup__form-input-wrapper">
            <input
              {...register("email", {
                required: "Укажите почту",
                validate: (value) => {
                  const result = Joi.validate(
                    value,
                    Joi.string().email({ minDomainAtoms: 2 })
                  );
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
              className="signup__form-input signup__form-input-second"
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
    </>
  );
}

export default Login;
