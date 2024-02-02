import 'cypress-file-upload';
//LOGIN USERS
Cypress.Commands.add('login', (username, password) => {
    //PAGE
    cy.visit('https://the-internet.herokuapp.com/login');
    
    //USERNAME 
    cy.get('#username').should('be.visible').type(username);
            
    //PASSWORD
    cy.get('#password').should('be.visible').type(password);

    //SUBMIT BUTTON
    cy.get('button').contains(' Login').should('be.visible').click({force: true})
})
