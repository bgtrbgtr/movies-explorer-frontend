import { Button } from "..";

function SearchForm() {
  return (
    <>
      <form className="movies__search-form">
        <input
          required
          placeholder="Фильм"
          type="search"
          className="movies__search-form-input"
        ></input>
        <Button type="submit" className="movies__search-form-input-button" />
      </form>
      <div className="movies__search-form-switch-box">
        <label className="movies__search-form-filter-switch">
          <input
            className="movies__search-form-input-switch"
            type="checkbox"
          ></input>
          <span className="movies__search-form-slider"></span>
        </label>
        <label className="movies__search-form-switch-caption">
          Короткометражки
        </label>
      </div>
    </>
  );
}

export default SearchForm;
