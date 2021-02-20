export default class UserInfo {
  constructor({
    nameProfileSelector,
    jobProfileSelector,
    avatarProfileSelector}, api) {
    this._nameProfile = document.querySelector(nameProfileSelector)
    this._jobProfile = document.querySelector(jobProfileSelector)
    this._avatarProfile = document.querySelector(avatarProfileSelector)
    this._api = api
  }

  getUserInfo() {
    return {
      nameProfile: this._nameProfile.textContent,
      jobProfile: this._jobProfile.textContent
    }
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.name
    this._jobProfile.textContent = data.job
  }

  setInitialInfo({name, job, img}) {
    this._nameProfile.textContent = name
    this._jobProfile.textContent = job
    this._avatarProfile.src = img
    this._avatarProfile.alt = name 
  }

  setUserId(id) {
    this._userId = id
  }

  returnUserId() {
    return this._userId
  }
}