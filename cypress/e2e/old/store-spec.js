/// <reference types="Cypress" />
/* eslint-env mocha */
/* global cy */
import * as utils from '../../utils'
import _ from 'lodash'

// testing the central Vuex data store
describe('UI to Vuex store', () => {
  beforeEach(utils.resetDatabase)
  beforeEach(utils.visit)

  const getStore = () => cy.window().its('app.$store')

  it('has loading, newTodo and todos properties', () => {
    getStore()
      .its('state')
      .should('have.keys', ['loading', 'newTodo', 'todos'])
  })

  it('starts empty', () => {
    getStore()
      .its('state')
      .should('deep.equal', {
        loading: true, // initially the store is loading data
        todos: [],
        newTodo: ''
      })
  })

  it('can enter new todo text', () => {
    const text = 'learn how to test with Cypress.io'
    cy.get('.todoapp')
      .find('.new-todo')
      .type(text)
      .trigger('change')

    getStore()
      .its('state.newTodo')
      .should('equal', text)
  })

  it('stores todos in the store', () => {
    utils.enterTodo('first todo')
    utils.enterTodo('second todo')

    getStore()
      .its('state.todos')
      .should('have.length', 2)

    const removeIds = list => list.map(todo => _.omit(todo, 'id'))
    getStore()
      .its('state.todos')
      .then(removeIds)
      .should('deep.equal', [
        {
          title: 'first todo',
          completed: false
        },
        {
          title: 'second todo',
          completed: false
        }
      ])
  })

  const stubMathRandom = () => {
    // first two digits are disregarded, so our "random" sequence of ids
    // should be '1', '2', '3', ...
    let counter = 101
    cy.window().then(win => {
      cy.stub(win.Math, 'random').callsFake(() => counter++)
    })
  }

  it('stores todos in the store (with ids)', () => {
    stubMathRandom()
    utils.enterTodo('first todo')
    utils.enterTodo('second todo')

    getStore()
      .its('state.todos')
      .should('have.length', 2)

    getStore()
      .its('state.todos')
      .should('deep.equal', [
        {
          title: 'first todo',
          completed: false,
          id: '1'
        },
        {
          title: 'second todo',
          completed: false,
          id: '2'
        }
      ])
  })
})

describe('Vuex store', () => {
  beforeEach(utils.resetDatabase)
  beforeEach(utils.visit)
  beforeEach(utils.stubMathRandom)

  let store

  beforeEach(() => {
    cy.window()
      .its('app')
      .its('$store')
      .then(s => {
        store = s
      })
  })

  const toJSON = x => JSON.parse(JSON.stringify(x))

  // returns the entire Vuex store
  const getStore = () => cy.then(_ => cy.wrap(toJSON(store.state)))

  // returns given getter value from the store
  const getFromStore = property =>
    cy.then(_ => cy.wrap(store.getters[property]))

  // and a helper methods because we are going to pull "todos" often
  const getStoreTodos = getFromStore.bind(null, 'todos')

  it('starts empty', () => {
    getStoreTodos().should('deep.equal', [])
  })

  it('can enter new todo text', () => {
    const text = 'learn how to test with Cypress.io'
    cy.get('.todoapp')
      .find('.new-todo')
      .type(text)
      .trigger('change')

    getFromStore('newTodo').should('equal', text)
  })

  it('can compare the entire store', () => {
    getStore().should('deep.equal', {
      loading: true, // initially the store is loading data
      todos: [],
      newTodo: ''
    })
  })

  it('can add a todo, type and compare entire store', () => {
    const title = 'a random todo'
    utils.enterTodo(title)

    const text = 'learn how to test with Cypress.io'
    cy.get('.todoapp')
      .find('.new-todo')
      .type(text)
      .trigger('change')

    getStore().should('deep.equal', {
      loading: false,
      todos: [
        {
          title,
          completed: false,
          id: '1'
        }
      ],
      newTodo: text
    })
  })

  it('can add a todo', () => {
    const title = `a single todo ${utils.newId()}`
    utils.enterTodo(title)
    getStoreTodos()
      .should('have.length', 1)
      .its('0')
      .and('have.all.keys', 'id', 'title', 'completed')
  })

  // thanks to predictable random id generation
  // we know the objects in the todos list
  it('can add a particular todo', () => {
    const title = `a single todo ${utils.newId()}`
    utils.enterTodo(title)
    getStoreTodos().should('deep.equal', [
      {
        title,
        completed: false,
        id: '2'
      }
    ])
  })

  it('can add two todos and delete one', () => {
    const first = utils.makeTodo()
    const second = utils.makeTodo()

    utils.enterTodo(first.title)
    utils.enterTodo(second.title)

    utils
      .getTodoItems()
      .should('have.length', 2)
      .first()
      .find('.destroy')
      .click({ force: true })

    utils.getTodoItems().should('have.length', 1)

    getStoreTodos().should('deep.equal', [
      {
        title: second.title,
        completed: false,
        id: '4'
      }
    ])
  })

  it('can be driven by dispatching utilss', () => {
    store.dispatch('setNewTodo', 'a new todo')
    store.dispatch('addTodo')
    store.dispatch('clearNewTodo')

    // assert UI
    utils
      .getTodoItems()
      .should('have.length', 1)
      .first()
      .contains('a new todo')

    // assert store
    getStore().should('deep.equal', {
      loading: false,
      todos: [
        {
          title: 'a new todo',
          completed: false,
          id: '1'
        }
      ],
      newTodo: ''
    })
  })
})

describe('Store utilss', () => {
  const getStore = () => cy.window().its('app.$store')

  beforeEach(utils.resetDatabase)
  beforeEach(utils.visit)
  beforeEach(utils.stubMathRandom)

  it('changes the state', () => {
    getStore().then(store => {
      store.dispatch('setNewTodo', 'a new todo')
      store.dispatch('addTodo')
      store.dispatch('clearNewTodo')
    })

    getStore()
      .its('state')
      .should('deep.equal', {
        loading: false,
        todos: [
          {
            title: 'a new todo',
            completed: false,
            id: '1'
          }
        ],
        newTodo: ''
      })
  })

  it('changes the ui', () => {
    getStore().then(store => {
      store.dispatch('setNewTodo', 'a new todo')
      store.dispatch('addTodo')
      store.dispatch('clearNewTodo')
    })

    // assert UI
    utils
      .getTodoItems()
      .should('have.length', 1)
      .first()
      .contains('a new todo')
  })

  it('calls server', () => {
    cy.intercept({
      method: 'POST',
      url: '/todos'
    }).as('postTodo')

    getStore().then(store => {
      store.dispatch('setNewTodo', 'a new todo')
      store.dispatch('addTodo')
      store.dispatch('clearNewTodo')
    })

    // assert server call
    cy.wait('@postTodo')
      .its('request.body')
      .should('deep.equal', {
        title: 'a new todo',
        completed: false,
        id: '1'
      })
  })
})
