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

  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res=>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Ошибка сервера')
      })
  }

}