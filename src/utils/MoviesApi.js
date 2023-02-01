class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`).catch((value) => {
        console.log(value);
      });
    }

    return res.json();
  }

  getMoviesInfo() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._getResponseData)
      .then((data) => {
        return data;
      });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-type": "application/json",
  },
});
