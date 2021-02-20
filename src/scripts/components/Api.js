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
        return Promise.reject('Карточки не найдены')
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
        return Promise.reject('Данные профиля не найдены')
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
        return Promise.reject('Редактирование не удалось')
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
        return Promise.reject('Редактирование не удалось')
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
        return Promise.reject('Удаление не удалось')
      })
  }

}