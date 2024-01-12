import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {

    //SKIP THIS ERROR
    if (err.message.includes('crossorigin')) {
      return false
    } 
})