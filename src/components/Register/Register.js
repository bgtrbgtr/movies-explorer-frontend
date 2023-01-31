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
        className="signup__form"
      >
        <span className="signup__form-input-caption">Имя</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 40,
            })}
            type="text"
            className="signup__form-input"
          ></input>
          {errors.name && (
            <span className="field-error field-error__signup">
              Укажите корректное имя
            </span>
          )}
        </div>
        <span className="signup__form-input-caption">E-mail</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register(
              "mail",
              { required: true },
              { validate: (value) => value.includes("@") }
            )}
            className="signup__form-input"
            type="email"
          ></input>
          {errors.mail && (
            <span className="field-error field-error__signup">
              Укажите корректную почту
            </span>
          )}
        </div>
        <span className="signup__form-input-caption">Пароль</span>
        <div className="signup__form-input-wrapper">
          <input
            {...register("pass", { required: true })}
            className="signup__form-input signup__form-input-third"
            type="password"
          ></input>
          {errors.pass && (
            <span className="field-error field-error__signin-password">
              Что-то пошло не так
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Register;
