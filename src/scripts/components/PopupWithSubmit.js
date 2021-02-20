import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupWithSubmitDeleteButton = this._popupElement.querySelector('.form__button_type_delete-card')
  }

  setEventListeners(deleteCard) {
    super.setEventListeners()
    this._handleDeleteCard = deleteCard
    this._popupWithSubmitDeleteButton.addEventListener('click', this._handleDeleteCard)
  }

  close() {
    super.close()
    this._popupWithSubmitDeleteButton.removeEventListener('click', this._handleDeleteCard)
  }
}