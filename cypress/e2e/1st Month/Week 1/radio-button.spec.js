describe('Radio Button', () => {

    beforeEach(() => {
        cy.visit('/radio-button')
    });

    it('Verify Labels', () => {
        //YES RADIO
        cy.get('label[for="yesRadio"]').should('be.visible');

        //IMPRESSIVE RADIO
        cy.get('label[for="impressiveRadio"]').should('be.visible');
        
        //NO RADIO
        cy.get('label[for="noRadio"]').should('be.visible');
    });
    

    it('Verify Radio Buttons Have The Correct State', () => {
        //QUESTION
        cy.get('div').contains('Do you like the site?').should('be.visible');

        //YES RADIO
        cy.get('#yesRadio').should('be.exist').and('not.have.attr', 'disabled');

        //IMPRESSIVE RADIO
        cy.get('#impressiveRadio').should('be.exist').and('not.have.attr', 'disabled');    
        
        //NO RADIO
        cy.get('#noRadio').should('be.exist').and('have.attr', 'disabled');    
    });

    
    it('Validate The Text Is Shown For Each Radio Button', () => {
        //YES RADIO
        cy.get('#yesRadio').check({force: true});
        cy.get('p').contains('You have selected Yes').should('be.visible');

        //IMPRESSIVE RADIO
        cy.get('#impressiveRadio').check({force: true});
        cy.get('p').contains('You have selected Impressive').should('be.visible');
    });
    
});