function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`)
  error.textContent = input.validationMessage
  input.classList.add(config.inputErrorClass)
}

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`)
  error.textContent = ''
  input.classList.remove(config.inputErrorClass)
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config)
  } else {
    showError(form, input, config)
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = false
  } else {
    button.classList.add(config.inactiveButtonClass)
    button.disabled = true
  }
}

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector)
  const submitButton = form.querySelector(config.submitButtonSelector)

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config)
      setButtonState(submitButton, form.checkValidity(), config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector)
  forms.forEach(form => {
    setEventListener(form, config)
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
  })
}

const validationConfig = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_state_invalid'
})

enableValidation(validationConfig)