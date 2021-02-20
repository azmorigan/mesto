export default class Card {
  constructor({name, link, owner, _id, userId, likes, cardSelector, handleCardClick, handleTrashClick, setLike, deleteLike}) {
    this._name = name
    this._link = link
    this._ownerId = owner._id
    this._userId = userId
    this._imageId = _id
    this._likes = likes
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleTrashClick = handleTrashClick
    this._setLike = setLike
    this._deleteLike = deleteLike
    this._likeCard = this._likeCard.bind(this) 
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
    return cardElement
  }
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', this._likeCard)
    this._cardRemoveButton.addEventListener('click', this._handleTrashClick)
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name))
  }

  createCard() {
    this._card = this._getTemplate()
    this._cardImage = this._card.querySelector('.element__img')
    this._cardTitle = this._card.querySelector('.element__title')
    this._cardLikeButton = this._card.querySelector('.element__like')
    this._cardRemoveButton = this._card.querySelector('.element__remove')
    this._cardLikeCount = this._card.querySelector('.element__like-count')

    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._cardLikeButton.classList.add('element__like_active')
      }
    });
    this._checkId()
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name
    this._cardLikeCount.textContent = this._likes.length
    this._setEventListeners()
    return this._card
  }

  _likeCard(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      this._cardLikeButton.classList.remove('element__like_active')
      this._deleteLike()
    } else {
      this._cardLikeButton.classList.add('element__like_active')
      this._setLike()
    }
    
  }

  removeItem() {
    this._card.remove()
  }

  _checkId() {
    if (this._ownerId !== this._userId) {
      this._cardRemoveButton.remove()
    } 
  }

  returnCardId() {
    return this._imageId
  }

  changeLikesCount(count) {
    this._cardLikeCount.textContent = count
  }
}