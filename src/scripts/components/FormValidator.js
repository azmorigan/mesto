export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._form = form
    this._inputList = this._form.querySelectorAll(this._inputSelector)
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
  }

  _showError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`)
    this._error.textContent = input.validationMessage
    input.classList.add(this._inputErrorClass)
  }

  _hideError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`)
    this._error.textContent = ''
    input.classList.remove(this._inputErrorClass)
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input)
    } else {
      this._showError(input)
    }
  }

  _toggleButtonState() {
    this._submitButton.classList.toggle(this._inputErrorClass)
  }

  setButtonState(isActive) {
    if (isActive) {
      this._submitButton.classList.remove(this._inactiveButtonClass)
      this._submitButton.disabled = false
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass)
      this._submitButton.disabled = true
    }
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    })
    this._toggleButtonState()
  }

  _setEventListeners(form) {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this.setButtonState(form.checkValidity())
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners(this._form)
  }

}

