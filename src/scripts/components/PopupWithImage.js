import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  open(img, name) {
    super.open()
    this._img = img
    this._name = name
    this._picturePopupImage = this._popupElement.querySelector('.modal__image')
    this._namePopupImage = this._popupElement.querySelector('.modal__title')
    this._picturePopupImage.src = this._img
    this._picturePopupImage.alt = this._name
    this._namePopupImage.textContent = this._name
  }
}