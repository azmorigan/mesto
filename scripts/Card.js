import {likeCard, removeItem, openPopupImage} from './functionsForCard.js'

class Card {
  constructor(card, cardSelector) {
    this._name = card.name
    this._link = card.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true)
    return cardElement
  }

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click', likeCard)
    this._card.querySelector('.element__remove').addEventListener('click', removeItem)
    this._card.querySelector('.element__img').addEventListener('click', () => openPopupImage(this._link, this._name))
  }

  createCard() {
    this._card = this._getTemplate()
    this._setEventListeners()
    this._card.querySelector('.element__img').src = this._link
    this._card.querySelector('.element__img').alt = this._name
    this._card.querySelector('.element__title').textContent = this._name
    return this._card
  }
}

export {Card}