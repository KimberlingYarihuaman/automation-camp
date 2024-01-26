describe('Login', () => {

    it('User Is Able To Log In Successfully', () => {
        //LOGIN
        cy.login('tomsmith', 'SuperSecretPassword!');

        //TITLE
        cy.get('h2').should('be.visible');

        //SUB TITLE
        cy.get('h4').should('be.visible');

        //VERIFY LOGGED IN USER
        cy.url().should('include', '/secure');
        cy.get('#flash').should('be.visible').and('include.text', 'You logged into a secure area!');
    });

    it('User Sees The Elements Into The Session And Close The Alert', () => {
        //LOGIN
        cy.login('tomsmith', 'SuperSecretPassword!');

        //TITLE
        cy.get('h2').should('be.visible').and('include.text', ' Secure Area');

        //BODY
        cy.get('h4').should('be.visible').and('include.text', 'Welcome to the Secure Area. When you are done click logout below.');

        //LOG OUT BUTTON
        cy.get('a').eq(2).should('be.visible').invoke('attr','href').then(($href) => {
            cy.request($href).then((resp) => {
                expect(resp.status).to.equal(200);
            })
        })
        //CLOSE ALERT
        cy.get('#flash').children('a').should('be.visible').click({force: true});

        //VERIFY ALERT NOT EXIST
        cy.get('#flash').should('not.exist');
    });

    it('User Clicks On The Logout Button', () => {
        //LOGIN
        cy.login('tomsmith', 'SuperSecretPassword!');

        //LOG OUT BUTTON
        cy.get('a').eq(2).should('be.visible').click({force: true});

        //VERIFY LOGGED OUT  USER
        cy.url().should('include', '/login');
        cy.get('#flash').should('be.visible').and('include.text', 'You logged out of the secure area!');
    });

    it('User Is Not Able To Log In And Closes The Alert', () => {
        //LOGIN
        cy.login('kimyari33', 'ApplyDigital12345-');

        //WRONG ALERT
        cy.get('#flash').should('be.visible').and('include.text', 'Your username is invalid!');

        //CLOSE ALERT
        cy.get('#flash').children('a').should('be.visible').click({force: true});

        //VERIFY ALERT NOT EXIST
        cy.get('#flash').should('not.exist');
    });
});