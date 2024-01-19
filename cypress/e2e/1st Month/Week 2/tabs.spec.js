describe('Tabs', () => {

    it('Validate All Tabs', () => {
        cy.visit('/tabs');
        //TABS
        cy.get('#tabsContainer>nav').children().should('be.visible').and('have.length', 4).each(($tab, index) => {
            //LINK
            cy.wrap($tab).should('have.attr', 'href');

            if(index!=3){
                //CLICK ON TAB
                cy.wrap($tab).click({force: true});
                //SELECTED TAB
                cy.wrap($tab).should('have.attr', 'aria-selected', 'true');
                //PARAGRAPH
                cy.get('.tab-content').children().eq(index).children().should('be.visible').and('have.length.gte', 1);

            }else {
                //DISABLED TAB
                cy.wrap($tab).should('have.attr', 'aria-disabled', 'true');
            }
        })
    });
});