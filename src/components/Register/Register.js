import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "..";
import logoSvg from "../../images/logo.svg";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="signup">
      <Link className="header__logo signup__header-logo" to={"/"}>
        <img className="signup__logo" alt="Main logo" src={logoSvg} />
      </Link>
      <Form
        name="signup-form"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <span className="signup-form__input-caption">Имя</span>
        <div className="signup-form__input-wrapper">
          <input
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 40,
            })}
            type="text"
            className="signup-form__input"
          ></input>
          {errors.name && (
            <span className="field-error field-error_signup">
              Укажите корректное имя
            </span>
          )}
        </div>
        <span className="signup-form__input-caption">E-mail</span>
        <div className="signup-form__input-wrapper">
          <input
            {...register(
              "mail",
              { required: true },
              { validate: (value) => value.includes("@") }
            )}
            className="signup-form__input"
            type="email"
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
            className="signup-form__input signup-form__input_third"
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

export default Register;
