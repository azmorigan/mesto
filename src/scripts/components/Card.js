export default class Card {
  constructor(card, likes, cardSelector, handleCardClick) {
    this._name = card.name
    this._link = card.link
    this._cardSelector = cardSelector
    this._likes = likes
    this._handleCardClick = handleCardClick
    this._card = document.querySelector(this._cardSelector).content.cloneNode(true)
    this._cardImage = this._card.querySelector('.element__img')
    this._cardTitle = this._card.querySelector('.element__title')
    this._cardLikeButton = this._card.querySelector('.element__like')
    this._cardRemoveButton = this._card.querySelector('.element__remove')
    this._cardLikeCount = this._card.querySelector('.element__like-count')
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', this._likeCard)
    this._cardRemoveButton.addEventListener('click', this._removeItem)
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name))
  }

  createCard() {
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name
    this._cardLikeCount.textContent = this._likes
    this._setEventListeners()
    return this._card
  }

  _likeCard(event) {
    event.target.classList.toggle('element__like_click')
  }

  _removeItem(event) {
    const removeItem = event.target.closest('.element')
    removeItem.remove()
  }
}