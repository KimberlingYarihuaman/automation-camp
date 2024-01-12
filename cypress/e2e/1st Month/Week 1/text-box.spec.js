describe('Text Box', () => {

    beforeEach(() => {
        cy.visit('/text-box');
    });


    it('Verify Labels', () => {
        //FULLNAME LABEL
        cy.get('#userName-label').should('be.visible');

        //EMAIL LABEL
        cy.get('#userEmail-label').should('be.visible');

        //CURRENT ADDRESS LABEL
        cy.get('#currentAddress-label').should('be.visible');

        //PERMANENT ADDRESS LABEL
        cy.get('#permanentAddress-label').should('be.visible');        
    });


    it('Validate The Email Field Shows An Error', () => {
        cy.get('#userEmail').as('email').type('kimberling.');
        cy.get('#submit').click({force: true});
        //CHECK THE ERROR CLASS FOR EMAIL
        cy.get('@email').should('have.class', 'field-error');
    });


    it('Fill Out The Fields And Send', () => {
        let name = "Kimberling Yarihuaman", 
        email = "kimberling.yarihuaman@gmail.com",
        currentAddress = "Plaza de León 5, 340568 Palencia, Spain",
        permanentAddress = "Los Jardinillos, 90099 Palencia, Spain";

        //USERNAME
        cy.get("#userName").should('be.visible').type(name);

        //EMAIL
        cy.get("#userEmail").should('be.visible').type(email);

        //CURRENT ADDRESS
        cy.get("#currentAddress").should('be.visible').type(currentAddress);

        //PERMANENT ADDRESS
        cy.get("#permanentAddress").should('be.visible').type(permanentAddress);

        //CLICK ON SUBMIT
        cy.get('#submit').should('be.visible').click({force: true});

        //VERIFY OUTPUT LABEL
        cy.get('#output').should('be.visible');

        //VERIFY IF THE NAME EXISTS
        cy.get('#name').should('be.visible').invoke("text").then(text  => {
            expect(text).to.include(name);
        })

        //VERIFY IF THE EMAIL EXISTS
        cy.get('#email').should('be.visible').invoke("text").then(text  => {
            expect(text).to.include(email);
        })

        //VERIFY IF THE CURRENT ADDRESS EXISTS
        cy.get('p#currentAddress').should('be.visible').invoke("text").then(text  => {
            expect(text).to.include(currentAddress);
        })

        //VERIFY IF THE PERMANENT ADDRESS EXISTS
        cy.get('p#permanentAddress').should('be.visible').invoke("text").then(text  => {
            expect(text).to.include(permanentAddress);
        })
    }); 
    
});