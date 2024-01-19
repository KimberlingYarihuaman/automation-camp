describe('Modal Dialogs', () => {

    beforeEach(() => {
        cy.visit('/modal-dialogs');
    });

    it('Validate The Small Modal', () => {

        cy.get('#showSmallModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('.modal-header').should('be.visible');
            cy.get('.close').should('be.visible');
            cy.get('.modal-body').should('be.visible');
            cy.get('.modal-footer').should('be.visible');
            cy.get('#closeSmallModal').should('be.visible');
        })
    });  

    it('Click On Close Icon Of Small Modal', () => {

        cy.get('#showSmallModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('.close').should('be.visible').click({force: true});
        })
        //VALIDATE CLOSED MODAL
        cy.get('.modal-content').should('not.exist');
    });

    it('Click On Close Button Of Small Modal', () => {

        cy.get('#showSmallModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('#closeSmallModal').should('be.visible').click({force: true});
        })
        //VALIDATE CLOSED MODAL
        cy.get('.modal-content').should('not.exist');
    });

    it('Validate The Large Modal', () => {

        cy.get('#showLargeModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('.modal-header').should('be.visible');
            cy.get('.close').should('be.visible');
            cy.get('.modal-body').should('be.visible');
            cy.get('.modal-footer').should('be.visible');
            cy.get('#closeLargeModal').should('be.visible');
        })
    });  

    it('Click On Close Icon Of Large Modal', () => {

        cy.get('#showLargeModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('.close').should('be.visible').click({force: true});
        })
        //VALIDATE CLOSED MODAL
        cy.get('.modal-content').should('not.exist');
    });

    it('Click On Close Button Of Large Modal', () => {

        cy.get('#showLargeModal').should('be.visible').click({force: true});
        //MODAL DIALOG
        cy.get('.modal-content').should('be.visible').within(() =>{
            cy.get('#closeLargeModal').should('be.visible').click({force: true});
        })
        //VALIDATE CLOSED MODAL
        cy.get('.modal-content').should('not.exist');
    });
});