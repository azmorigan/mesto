import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._picturePopupImage = this._popupElement.querySelector('.modal__image')
    this._namePopupImage = this._popupElement.querySelector('.modal__title')
  }
  open(img, name) {
    super.open()
    this._picturePopupImage.src = img
    this._picturePopupImage.alt = name
    this._namePopupImage.textContent = name
  }
}