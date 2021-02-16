export default class Api {
  constructor({url, headers}) {
    this._url = url
    this._headers = headers
  }

  getInfo() {
    return fetch(this._url, {
      headers: {
      authorization: 'afa481ae-bc0e-4856-9ec0-3e79ade90f5a'
      }
    })
      .then(res=>res.json())
  }
}