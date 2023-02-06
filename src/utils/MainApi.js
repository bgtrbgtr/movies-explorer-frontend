class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._userInfo = {};
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }

    return res.json();
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  addMovieToSaved({
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._baseUrl}/movies/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        movieId,
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      }),
    }).then(this._getResponseData);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  likeCard(movie, liked) {
    if (!liked) {
      return fetch(`${this._baseUrl}/movies/${movie.movieId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then(this._getResponseData)
        .then((data) => {
          return data;
        });
    } else {
      return fetch(`${this._baseUrl}/movies/${movie.movieId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(this._getResponseData)
        .then((data) => {
          return data;
        });
    }
  }

  changeUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._getResponseData);
  }

  setToken(token) {
    this._headers.authorization = `${token}`;
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.movie-explore.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});
