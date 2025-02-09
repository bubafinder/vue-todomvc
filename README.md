# Cypress + Percy Workshop
### Cypress

#### Clone repository locally
`git clone https://github.com/bubafinder/vue-todomvc.git`

#### Install node packages
`npm i`

#### Run application
`npm run start`           

#### Application URL 
`http://localhost:3000`

#### Install Cypress
`npm install cypress -D`

#### Add Cypress launch scripts inside `package.json` file
```
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run"
  }
}
```

#### Add ‘baseUrl’ to the “cypress.config.js” file
```
module.exports = defineConfig {
  e2e: {
     baseUrl: ‘http://localhost:3000’  
  }
}
```

#### Run application & Open Cypress GUI
`npm run dev`


### Percy

#### Percy URL
`percy.io/login`

#### Percy Login Credentials
```
Username: mlovric+dump@extensionengine.com
Pass: on paper
```
#### Install Percy CLI & Percy for Cypress packages
`npm install -D @percy/cli @percy/cypress`

#### Add PERCY_TOKEN (Run command inside terminal)
`export PERCY_TOKEN=web_a7cebe60b9911dcc6be846b785cb2759c407f87550eb77e8d61c45bfe197fa7d`

#### Add Percy to the project `cypress/support/e2e.js`
`import '@percy/cypress';`

#### Add launch scripts for visual tests inside `package.json` file
```
{
  "scripts": {
    "test:visual": "start-server-and-test start http://localhost:3000 cy:visual",
    "cy:visual": "percy exec -- cypress run --spec 'cypress/e2e/visual.cy.js'"
  }
}
```

#### Update `cy:run` to
`"cy:run": "cypress run  --spec 'cypress/e2e/!(visual.cy.js)**'"`

### Pre-requisites
#### MacOS
1. Install VS Code - https://code.visualstudio.com/download
2. Install Node.JS - https://nodejs.org/en/download
3. Install Git - https://git-scm.com/download/mac

#### Windows 
1. Install VS Code - https://code.visualstudio.com/download
2. Install Node.JS - https://nodejs.org/en/download
3. Install Git - https://git-scm.com/download/win


# Original readme

# vue-vuex-todomvc [![renovate-app badge][renovate-badge]][renovate-app] [![ci status][ci image]][ci url] ![cypress version](https://img.shields.io/badge/cypress-11.2.0-brightgreen)

Simple TodoMVC with [Vue.js](https://vuejs.org/)
and [Vuex](https://vuex.vuejs.org/en/) data store.

Based on [this Vuex tutorial](https://codeburst.io/build-a-simple-todo-app-with-vue-js-1778ae175514) and the basic official [TodoMVC vue.js example](https://github.com/vuejs/vue/tree/dev/examples/todomvc)

Read my [step by step tutorial](https://glebbahmutov.com/blog/vue-vuex-rest-todomvx/) explaining the code and this [thorough blogpost](https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/) how this application is tested using Cypress.

## Software organization

![Vue Vuex REST data flow](vue-vuex-rest.png)

## Use

Clone this repository then

```
npm install
npm start
```

Open `localhost:3000` in the browser.

## Tests

All tests are implemented using [Cypress.io](https://www.cypress.io/)

- [GUI E2E tests](cypress/integration/ui-spec.js)
- [API tests](cypress/integration/api-spec.js)
- [Vuex store tests](cypress/integration/store-spec.js)

### cy-spok example

See the spec [new-item-spec.js](./cypress/integration/new-item-spec.js) that shows how to use [cy-spok](https://github.com/bahmutov/cy-spok) plugin to confirm the request object. Watch the introduction to cy-spok plugin video [here](https://youtu.be/MLDsqBd_gVU).

## Development

The `app` global variable exposes the Vue instance.

To see "plain" values from the store (without all `Observer` additions)

```js
app.$store.getters.todos
    .map(JSON.stringify) // strips utility fields
    .map(JSON.parse)     // back to plain objects
    .forEach(t => console.log(t)) // prints each object
```

Or print them as a table

```js
console.table(app.$store.getters.todos.map(JSON.stringify).map(JSON.parse))
```

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2021

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/vue-vuex-todomvc/issues) on Github

[ci image]: https://github.com/bahmutov/vue-vuex-todomvc/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/vue-vuex-todomvc/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
