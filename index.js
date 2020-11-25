let popup = document.querySelector('.popup')
let editPopap = document.querySelector('.profile__edit-button')
let closePopap = document.querySelector('.popup__close')
let formElement = document.querySelector('.form')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

function openPopup() {
  popup.classList.add('popup__opened')
}

function closePopup() {
  popup.classList.remove('popup__opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault()

  let nameInput = formElement.querySelector('.form__name')
  let careerInput = formElement.querySelector('.form__career')

  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = careerInput.value
  closePopup()
}

editPopap.addEventListener('click', openPopup)
closePopap.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)