describe('Buttons', () => {

    beforeEach(() => {
        cy.visit('/buttons');
    });

    it('Double Click And Shows A Message', () => {
        //DOUBLE CLICK
        cy.get('#doubleClickBtn').should('be.visible').dblclick();
        //MESSAGE
        cy.get('#doubleClickMessage').should('be.visible').and('have.text', 'You have done a double click');
    });
    
    it('Only A Click And Does Not Show The Message', () => {
        //A CLICK
        cy.get('#doubleClickBtn').should('be.visible').click({force: true});
        //NOT MESSAGE
        cy.get('#doubleClickMessage').should('not.exist');
    });

    it('Right Click And Shows A Message', () => {
        //RIGHT CLICK
        cy.get('#rightClickBtn').should('be.visible').rightclick();
        //MESSAGE
        cy.get('#rightClickMessage').should('be.visible').and('have.text', 'You have done a right click');
    });

    it('Only A Click And Does Not Show The Message', () => {
        //A CLICK
        cy.get('#rightClickBtn').should('be.visible').click();
        //NOT MESSAGE
        cy.get('#rightClickMessage').should('not.exist');
    });

    it('Dynamic Click And Shows A Message', () => {
        //DYNAMIC CLICK
        cy.get('button').eq(3).should('be.visible').click();
        //MESSAGE
        cy.get('#dynamicClickMessage').should('be.visible').and('have.text', 'You have done a dynamic click');
    });

});