export default class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  getInitialCards() {
    return fetch(this._url + 'cards/', {
      headers: this._headers
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Карточки не найдены: ${res.status}` )
      })
  }

  getProfileInfo() {
    return fetch(this._url + 'users/me/', {
      headers: this._headers
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Данные профиля не найдены: ${res.status}`)
      })
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
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Редактирование не удалось: ${res.status}`)
      })
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
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Карточка не добавлена: ${res.status}`)
      })
  }

  deleteCard(data) {
    return fetch(this._url + 'cards/' + data, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Карточка не удалена: ${res.status}`)
      })
  }

  setLike(data) {
    return fetch(this._url + 'cards/likes/' + data, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Лайк не поставился: ${res.status}`)
      })
  }

  deleteLike(data) {
    return fetch(this._url + 'cards/likes/' + data, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Лайк не удалился: ${res.status}`)
      })
  }

  editProfile(imageUrl) {
    return fetch(this._url + 'users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Аватар не изменен: ${res.status}`)
      })
  }
}