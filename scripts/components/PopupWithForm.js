import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._formElement = this._popupElement.querySelector('.form')
    this._handleFormSubmit = handleFormSubmit
  }

  close() {
    super.close()
    this._formElement.reset()
  }
  
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input')
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}