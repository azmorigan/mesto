export default class Section {
  constructor({items, renderer}, containerOfCards) {
    this._renderedItems = items
    this._containerOfCards = containerOfCards
    this._renderer = renderer
  }

  addItem(element) {
    this._containerOfCards.prepend(element)
  }

  renderItems() {
    this._renderedItems.forEach(item=>{
      this._renderer(item)
    })
  }
}