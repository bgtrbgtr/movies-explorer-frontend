import { useForm } from "react-hook-form";
import { Button, Header } from "..";

function Profile({ onPopupOpen, handleLogout }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <Header onPopupOpen={onPopupOpen} />
      <section className="profile">
        <h2 className="profile__heading">Привет, Виталий!</h2>
        <form
          name="profile-info"
          className="profile__form"
          onSubmit={handleSubmit(onSubmit, onError)}
          method="post"
        >
          <div className="profile__form-row">
            <label className="profile__form-row-caption">Имя</label>
            <input
              {...register("name", { minLength: 2, maxLength: 40 })}
              type="text"
              className="profile__form-input"
              placeholder="Василий"
            ></input>
            {errors.name && (
              <span className="field-error">Укажите корректное имя</span>
            )}
          </div>
          <div className="profile__form-row">
            <label className="profile__form-row-caption">E-mail</label>
            <input
              {...register("email", {
                validate: (value) => value.includes("@"),
              })}
              className="profile__form-input profile__form-input_unbordered"
              placeholder="pochta@yandex.ru"
            ></input>
            {errors.email && (
              <span className="field-error">Укажите корректную почту</span>
            )}
          </div>
          <Button
            className="profile__form-submit-button"
            type="submit"
            buttonText="Редактировать"
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
