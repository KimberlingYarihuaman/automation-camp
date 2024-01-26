describe('Basic Auth', () => {

    it('User Is Able To Access With Basic Auth Successfully', () => {
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        })
        //HEADER
        cy.get('h3').should('be.visible').and('include.text', 'Basic Auth');

        //PARAGRAPH
        cy.get('p').should('be.visible').and('include.text', 'Congratulations! You must have the proper credentials.');
    });

    it('User Is Not Able To Access With Basic Auth', () => {
        cy.request({
            method: 'GET',
            url: 'https://the-internet.herokuapp.com/basic_auth',
            auth: {
                username: 'kim',
                password: '12345!Apply'
            },
            failOnStatusCode: false
        }).then((resp) => {
            //VALIDATE STATUS CODE
            expect(resp.status).to.equal(401);
        });
    });
});

