class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._form = form
  }

_showError(form, input) {
  this._error = form.querySelector(`#${input.id}-error`)
  this._error.textContent = input.validationMessage
  input.classList.add(this._inputErrorClass)
}

_hideError(form, input) {
  this._error = form.querySelector(`#${input.id}-error`)
  this._error.textContent = ''
  input.classList.remove(this._inputErrorClass)
}

_checkInputValidity(form, input) {
  if (input.validity.valid) {
    this._hideError(form, input)
  } else {
    this._showError(form, input)
  }
}

// 2-ой публичный метод (не по тз), но он используется в 
// при открытии попапов в index.js

setButtonState(button, isActive) {
  if (isActive) {
    button.classList.remove(this._inactiveButtonClass)
    button.disabled = false
  } else {
    button.classList.add(this._inactiveButtonClass)
    button.disabled = true
  }
}


_setEventListeners(form) {
  const inputList = form.querySelectorAll(this._inputSelector)
  const submitButton = form.querySelector(this._submitButtonSelector)

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      this._checkInputValidity(form, input)
      this.setButtonState(submitButton, form.checkValidity())
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

export {FormValidator}

