let popup = document.querySelector('.popup')
let editPopap = document.querySelector('.profile__edit-button')
let closePopap = document.querySelector('.popup__close')

function openPopup() {
  popup.classList.add('popup__opened')
}

function closePopup() {
  popup.classList.remove('popup__opened')
}

editPopap.addEventListener('click', openPopup)
closePopap.addEventListener('click', closePopup)