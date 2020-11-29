let popup = document.querySelector('.popup')
let editPopap = document.querySelector('.profile__edit-button')
let closePopap = document.querySelector('.popup__close')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formElement = document.querySelector('.form')
// Доступ к input через атрибут name
let nameInput = formElement.name
let jobInput = formElement.job

// Открыть попап
function openPopup() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  popup.classList.add('popup_opened')
}

// Закрыть попап
function closePopup() {
  popup.classList.remove('popup_opened')
}

// Замена имени и деятельности с помощью формы
function formSubmitHandler(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value
  closePopup()
}

editPopap.addEventListener('click', openPopup)
closePopap.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)