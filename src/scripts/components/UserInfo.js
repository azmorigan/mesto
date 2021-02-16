export default class UserInfo {
  constructor({
    nameProfileSelector,
    jobProfileSelector,
    avatarProfileSelector},
    {nameProfile, aboutProfile, avatarProfile}) {
    this._nameProfile = document.querySelector(nameProfileSelector)
    this._jobProfile = document.querySelector(jobProfileSelector)
    this._avatarProfile = document.querySelector(avatarProfileSelector)
    this._name = nameProfile
    this._about = aboutProfile
    this._avatar = avatarProfile
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

  setInitialInfo() {
    this._nameProfile.textContent = this._name
    this._jobProfile.textContent = this._about
    this._avatarProfile.src = this._avatar
    this._avatarProfile.alt = this._name 
  }
}