/// <reference types="Cypress" />
/* eslint-env mocha */
/* global cy */
import * as action from '../actions'

describe('DUMP workshop 2023', () => {
beforeEach(() => {
  action.resetDB()
  action.visit()
  action.getTodoApp().should('be.visible')
})

it('Create TODO item', () => {
  action.addTodoItem()
})

it('Complete TODO item', () => {
  action.addTodoItem()
  action.addTodoItem('Second item')
  action.completeTodoItem()
})

it('Uncomplete TODO item', () => {
  action.addTodoItem()
  action.completeTodoItem()
  action.uncompleteTodoItem()
})

it('Delete TODO item', () => {
  action.addTodoItem()
  action.deleteTodoItem()
})
})
