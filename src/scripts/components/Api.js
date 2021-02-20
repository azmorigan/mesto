export default class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._url + 'cards/', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(this._url + 'users/me/', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  uploadProfileInfo(name, job) {
    return fetch(this._url + 'users/me/', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(this._url + 'cards/', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(data) {
    return fetch(this._url + 'cards/' + data, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  setLike(data) {
    return fetch(this._url + 'cards/likes/' + data, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(data) {
    return fetch(this._url + 'cards/likes/' + data, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  editProfile(imageUrl) {
    return fetch(this._url + 'users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}