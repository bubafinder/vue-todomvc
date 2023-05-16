/// <reference types="Cypress" />
/* eslint-env mocha */
/* global cy */
import * as utils from '../utils'

it('loads the app', () => {
  utils.visit()
  utils.getTodoApp().should('be.visible')
})

describe('UI', () => {
  beforeEach(utils.resetDatabase)
  beforeEach(utils.visit)

  context('basic features', () => {
    it('loads application', () => {
      utils.getTodoApp().should('be.visible')
    })

    it('starts with zero items', () => {
      cy.get('.todo-list')
        .find('li')
        .should('have.length', 0)
    })

    it('adds two items', () => {
      utils.enterTodo('first item')
      utils.enterTodo('second item')
      utils.getTodoItems().should('have.length', 2)
    })

    it('completes an item', () => {
      utils.enterTodo('first item')
      utils.enterTodo('second item')
      utils.getTodoItem(1).should('not.have.class', 'completed')
      utils.getTodoItem(2).should('not.have.class', 'completed')
      utils
        .getTodoItem(2)
        .find('.toggle')
        .check()
      utils.getTodoItem(2).should('have.class', 'completed')
      // reload the data - 2nd item should still be completed
      cy.reload()
      utils.getTodoItem(1).should('not.have.class', 'completed')
      utils.getTodoItem(2).should('have.class', 'completed')
    })
  })

  context('advanced', () => {
    it('adds two and deletes first', () => {
      utils.enterTodo('first item')
      utils.enterTodo('second item')

      utils
        .getTodoItems()
        .contains('first item')
        .parent()
        .find('.destroy')
        .click({ force: true }) // because it only becomes visible on hover

      cy.contains('first item').should('not.exist')
      cy.contains('second item').should('exist')
      utils.getTodoItems().should('have.length', 1)
    })
  })
})
