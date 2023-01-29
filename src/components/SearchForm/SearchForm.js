import { Button } from "..";

function SearchForm() {
  return (
    <>
      <form className="search-form__form">
        <input
          placeholder="Фильм"
          type="search"
          className="search-form__input"
        ></input>
        <Button type="submit" className="search-form__form-button" />
      </form>
      <div className="search-form__switch-box">
        <label className="search-form__filter-switch">
          <input className="search-form__input-switch" type="checkbox"></input>
          <span className="search-form__slider"></span>
        </label>
        <label className="search-form__switch-caption">Короткометражки</label>
      </div>
    </>
  );
}

export default SearchForm;
