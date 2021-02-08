export default class UserInfo {
  constructor({nameProfileSelector, jobProfileSelector}, nameInput, jobInput) {
    this._nameProfile = document.querySelector(nameProfileSelector)
    this._jobProfile = document.querySelector(jobProfileSelector)
    this._nameInput = nameInput
    this._jobInput = jobInput
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

  openProfile() {
    this._nameInput.value = this._nameProfile.textContent
    this._jobInput.value = this._jobProfile.textContent
  }
}