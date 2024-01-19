describe('Add And Remove Elements', () => {

    it('Add And Delete Many Elements Clicking On The Corresponding Button', () => {
        let clicksCounter = 10;

        cy.visit('https://the-internet.herokuapp.com/add_remove_elements/');

        //ADD ELEMENTS
        for(let i = 0; i < clicksCounter; i++) {
            //CLICK ON BUTTON
            cy.get('button').contains('Add Element').should('be.visible').click({force: true});
            //CHECK ADDED BUTTONS
            cy.get('#elements').children().should('be.visible').and('have.length', i+1);
        }

        //DELETE ELEMENTS
        cy.get('#elements').children().each(($el) => {
            //CLICK ON DELETE
            cy.wrap($el).click({force: true});
            //CHECK NOT EXIST
            cy.wrap($el).should('not.exist');  
        })
        //CHECK ALL DELETED ELEMENTS
        cy.get('#elements').children().should('have.length', 0);
    });
});