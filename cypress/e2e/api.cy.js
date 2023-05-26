/// <reference types="Cypress" />
/* eslint-env mocha */
/* global cy */
import apiActions from '../actions/api'
import action from '../actions/index'

let counter = 1

describe('DumpDays API Tests', () => {
  beforeEach(() => {
    action.resetDB()
    counter = 1
  })

  it('Create To-Do over API', () => {
    apiActions.addTodo('API ToDo Text', counter++)
    apiActions.addTodo('API ToDo Text', counter++)
    apiActions.fetchTodos()
  })

  it('Delete ToDo over API', () => {
    apiActions.addTodo('Delete this', counter)
    apiActions.fetchTodos()
    apiActions.deleteTodo(counter)
    apiActions.fetchTodos()
  })

  it('Complete ToDo over API', () => {
    apiActions.addTodo('Complete This', counter)
    apiActions.completeTodo(counter)
    apiActions.fetchTodos()
  })
})
