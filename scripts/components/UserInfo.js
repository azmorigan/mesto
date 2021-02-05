import {nameInputChangeProfile, jobInputChangeProfile} from '../utils/constants.js'

export default class UserInfo {
  constructor({nameProfileSelector, jobProfileSelector}) {
    this._nameProfile = document.querySelector(nameProfileSelector)
    this._jobProfile = document.querySelector(jobProfileSelector)
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
    nameInputChangeProfile.value = this.getUserInfo().nameProfile
    jobInputChangeProfile.value = this.getUserInfo().jobProfile
  }
}