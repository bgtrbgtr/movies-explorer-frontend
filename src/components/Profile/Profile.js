import { useForm } from "react-hook-form";
import { NavContext, CurrentUserContext, AppContext } from "../../contexts";
import { Button, Header } from "..";
import { useContext, useEffect } from "react";
import Joi from "joi-browser";

function Profile({ onPopupOpen }) {
  const navContext = useContext(NavContext);
  const userContext = useContext(CurrentUserContext).currentUser;
  const appContext = useContext(AppContext);
  const handleLogout = navContext.onLogout;
  const handleChangeUserInfo = navContext.onChangeUserInfo;
  const isChangeInfoOk = appContext.isChangeInfoOk;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    reset({ name: "", email: "" });
  }, [isSubmitSuccessful]);

  const onSubmit = ({ name, email }) => {
    handleChangeUserInfo({
      name: name || userContext.name,
      email: email || userContext.email,
    });
  };
  return (
    <div>
      <Header onPopupOpen={onPopupOpen} />
      <section className="profile">
        <h2 className="profile__heading">Привет, {userContext.name}!</h2>
        <form
          name="profile-info"
          className="profile__form"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <div className="profile__form-row">
            <label className="profile__form-row-caption">Имя</label>
            <input
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Имя должно содержать более 2 символов",
                },
                maxLength: {
                  value: 30,
                  message: "Имя не должно содержать более 30 симолов",
                },
                validate: (value) => {
                  const result = value !== userContext.name;
                  return result ? null : "Новое имя совпадает с текущим";
                },
              })}
              type="text"
              className="profile__form-input"
              placeholder={userContext.name}
            ></input>
            {errors.name && (
              <span className="field-error">{errors.name.message}</span>
            )}
          </div>
          <div className="profile__form-row">
            <label className="profile__form-row-caption">E-mail</label>
            <input
              {...register("email", {
                validate: {
                  isCorrect: (value) => {
                    if (value) {
                      const result = Joi.validate(value, Joi.string().email());
                      return result.error ? "Укажите корректную почту" : null;
                    }
                  },
                  isNew: (value) => {
                    const result = value !== userContext.email;
                    return result ? null : "Новая почта совпадает с текущей";
                  },
                },
              })}
              className="profile__form-input profile__form-input_unbordered"
              placeholder={userContext.email}
            ></input>
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </div>
          <p
            className={`field-error field-error__submit ${
              isChangeInfoOk.status ? "field-error__submit_invisible" : null
            }`}
          >
            {isChangeInfoOk.message}
          </p>
          <Button
            className={`profile__form-submit-button ${
              isValid ? null : "profile__form-submit-button_disabled"
            }`}
            type="submit"
            buttonText="Редактировать"
            disable={isValid}
          />
        </form>
        <Button
          className="profile__logout-button"
          type="button"
          buttonText="Выйти из аккаунта"
          onClick={handleLogout}
        />
      </section>
    </div>
  );
}

export default Profile;
