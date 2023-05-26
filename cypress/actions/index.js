function visit() {
  cy.visit('/')
}

function resetDB(todos = []) {
  cy.request('POST', '/reset', { todos })
}

function getTodoItem(index = 1) {
  return cy.get(`.todo-list li:nth-child(${index})`)
}

function getTodoApp() {
  return cy.get('.todoapp')
}

function addTodoItem(text = 'Item') {
  return cy.get('.new-todo').type(`${text}{enter}`)
}

function deleteTodoItem(index = 1) {
  return getTodoItem(index).find('.destroy').click({ force: true })
}

function completeTodoItem(index = 1) {
  return getTodoItem(index).find('.toggle').check()
}

function uncompleteTodoItem(index = 1) {
  return getTodoItem(index).find('.toggle').check()
}

module.exports = {
  visit,
  resetDB,
  getTodoApp,
  getTodoItem,
  addTodoItem,
  deleteTodoItem,
  completeTodoItem,
  uncompleteTodoItem
}
