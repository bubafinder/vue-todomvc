function addTodo(title, id) {
  return cy.request('POST', '/todos', {
    title,
    completed: false,
    id: String(id),
  })
}

function fetchTodos() {
  return cy.request('/todos').its('body')
}

function deleteTodo(id) {
  return cy.request('DELETE', `/todos/${id}`)
}

function completeTodo(id) {
  return cy.request('PATCH', `/todos/${id}`, {
    completed: true,
  })
}

module.exports = { addTodo, fetchTodos, deleteTodo, completeTodo }
