import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "..";
import logoSvg from "../../images/logo.svg";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="signup">
      <Link className="header__logo" to={"/"}>
        <img className="signup__logo" alt="Main logo" src={logoSvg} />
      </Link>
      <Form
        name="signup-form"
        title="Рады видеть!"
        buttonText="Войти"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <span className="signup-form__input-caption">E-mail</span>
        <div className="signup-form__input-wrapper">
          <input
            {...register(
              "mail",
              { required: true },
              { validate: (value) => value.includes("@") }
            )}
            className="signup-form__input"
          ></input>
          {errors.mail && (
            <span className="field-error field-error_signup">
              Укажите корректную почту
            </span>
          )}
        </div>
        <span className="signup-form__input-caption">Пароль</span>
        <div className="signup-form__input-wrapper">
          <input
            {...register("pass", { required: true })}
            className="signup-form__input signup-form__input_second"
            type="password"
          ></input>
          {errors.pass && (
            <span className="field-error field-error_signin-password">
              Что-то пошло не так
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Login;
