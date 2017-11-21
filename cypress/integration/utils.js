/* global cy */
export const resetDatabase = () => {
  cy.exec('npm run reset:database')
  cy.wait(3000) // gives json-server a chance to reload
}

export const visit = () => cy.visit('/')

export const newId = () =>
  Math.random()
    .toString()
    .substr(2, 10)

// if we expose "newId" factory method from the application
// we can easily stub it. But this is a realistic example of
// stubbing "test window" random number generator
// and "application window" random number generator that is
// running inside the test iframe
export const stubNewId = () => {
  // first two digits are disregarded, so our "random" sequence of ids
  // should be '1', '2', '3', ...
  let counter = 101
  cy.stub(Math, 'random').callsFake(_ => counter++)
  cy.window().then(win => {
    cy.stub(win.Math, 'random').callsFake(_ => counter++)
  })
}

export const makeTodo = (text = 'todo') => {
  const id = newId()
  const title = `${text} ${id}`
  return {
    id,
    title,
    completed: false
  }
}

export const enterTodo = (text = 'example todo') =>
  cy
    .get('.todoapp')
    .find('.new-todo')
    .type(`${text}{enter}`)

export const getTodoItems = () => cy.get('.todo-list').find('li')
