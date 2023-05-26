export const visit = () => {
  cy.visit('/')
}

export const resetDB = (todos = []) => {
  cy.request('POST', '/reset', { todos })
}

export const getTodoItem = (index = 1) => {
  return cy.get(`.todo-list li:nth-child(${index})`)
}

export const getTodoApp = () => {
  return cy.get('.todoapp')
}

export const addTodoItem = (text = 'Item') => {
  return cy.get('.new-todo').type(`${text}{enter}`)
}

export const deleteTodoItem = (index = 1) => {
  return getTodoItem(index).find('.destroy').click({ force: true })
}

export const completeTodoItem = (index = 1) => {
  return getTodoItem(index).find('.toggle').check()
}

export const uncompleteTodoItem = (index = 1) => {
  return getTodoItem(index).find('.toggle').check()
}
