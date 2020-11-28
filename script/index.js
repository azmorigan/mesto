let popup = document.querySelector('.popup')
let editPopap = document.querySelector('.profile__edit-button')
let closePopap = document.querySelector('.popup__close')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formElement = document.querySelector('.form')
let nameInput = formElement.querySelector('.form__input_name')
let jobInput = formElement.querySelector('.form__input_job')

function openPopup() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value
  closePopup()
}

editPopap.addEventListener('click', openPopup)
closePopap.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)