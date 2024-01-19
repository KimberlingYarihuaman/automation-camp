describe('Links', () => {

    it('Validate Link Status, Attributes And API Call', () => {

        let status, text;
        let statusCode = {
            created: {
                code: '201',
                statusText: 'Created'
            },
            noContent: {
                code: '204',
                statusText: 'No Content'
            },
            moved: {
                code: '301',
                statusText: 'Moved Permanently'
            },
            badRequest: {
                code: '400',
                statusText: 'Bad Request'
            },
            unauthorized: {
                code: '401',
                statusText: 'Unauthorized'
            },
            forbidden: {
                code: '403',
                statusText: 'Forbidden'
            },
            notFound: {
                code: '404',
                statusText: 'Not Found'
            }
        }

        cy.visit('/links');
        cy.get('#linkWrapper>p>a').should('be.visible').each(($el, index) => {

            if(index===0 || index===1){
                //VALIDATE LINK STATUS
                cy.wrap($el).invoke('attr','href').then(($href) => {
                    cy.request($href).then((resp) =>{
                        expect(resp.status).to.equal(200);
                    })
                })
                //VALIDATE ATTRIBUTES
                cy.wrap($el).should('be.visible')
                .and('have.attr', 'target', '_blank')
                .and('have.attr', 'href');

            }else{
                //VALIDATE ATTRIBUTES
                cy.wrap($el).should('be.visible')
                .and('not.have.attr', 'target', '_blank')
                .and('have.attr', 'href');
                //CLICK ON LINK
                cy.wrap($el).click({force: true});
                //MESSAGE
                cy.wrap($el).invoke('text').then(($op) => {

                    switch($op) {

                        case 'Created':
                           status = statusCode.created.code;
                           text = statusCode.created.statusText;
                        break;

                        case 'No Content':
                           status = statusCode.noContent.code;
                           text = statusCode.noContent.statusText;
                        break;

                        case 'Moved':
                           status = statusCode.moved.code;
                           text = statusCode.moved.statusText;
                        break;

                        case 'Bad Request':
                           status = statusCode.badRequest.code;
                           text = statusCode.badRequest.statusText;
                        break;

                        case 'Unauthorized':
                           status = statusCode.unauthorized.code;
                           text = statusCode.unauthorized.statusText;
                        break;

                        case 'Forbidden':
                           status = statusCode.forbidden.code;
                           text = statusCode.forbidden.statusText;
                        break;

                        case 'Not Found':
                           status = statusCode.notFound.code;
                           text = statusCode.notFound.statusText;
                        break;
                    }
                    cy.get('#linkResponse').should('have.text', 'Link has responded with staus '+ status + ' and status text ' + text);
                })
            }
        })
    });
});