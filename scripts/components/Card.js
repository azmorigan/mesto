export default class Card {
  constructor(card, cardSelector, likeCard, removeItem, openPopupImage) {
    this._name = card.name
    this._link = card.link
    this._cardSelector = cardSelector
    this._likeCard = likeCard
    this._removeItem = removeItem
    this._openPopupImage = openPopupImage
    this._card = document.querySelector(this._cardSelector).content.cloneNode(true)
    this._cardImage = this._card.querySelector('.element__img')
    this._cardTitle = this._card.querySelector('.element__title')
    this._cardLikeButton = this._card.querySelector('.element__like')
    this._cardRemoveButton = this._card.querySelector('.element__remove')
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', this._likeCard)
    this._cardRemoveButton.addEventListener('click', this._removeItem)
    this._cardImage.addEventListener('click', () => this._openPopupImage(this._link, this._name))
  }

  createCard() {
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name
    this._setEventListeners()
    return this._card
  }
}