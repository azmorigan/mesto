const popup = document.querySelector('.popup')
const editPopap = document.querySelector('.profile__edit-button')
const closePopap = document.querySelector('.popup__close')
const formElement = document.querySelector('.form')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

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