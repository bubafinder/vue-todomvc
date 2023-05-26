/// <reference types="Cypress" />
/* eslint-env mocha */
/* global cy */
import * as action from '../actions'

it('Visual test', () => {
  action.resetDB()
  action.visit()
  action.getTodoApp().should('be.visible')

  action.addTodoItem('example todo')
  action.addTodoItem('example todo')

  action.completeTodoItem()

  cy.percySnapshot('dashboard')
})
