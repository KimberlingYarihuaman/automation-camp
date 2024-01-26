describe('Select Menu', () => {

    beforeEach(() => {
        cy.visit('/select-menu');
    });

    it('Click On Select Value Field', () => {
        cy.get('#react-select-2-input').should('be.visible')
        .and('have.attr', 'autocapitalize', 'none')
        .and('have.attr', 'autocomplete', 'off')
        .and('have.attr', 'autocorrect', 'off')
        .and('have.attr', 'spellcheck', 'false')
        .and('have.attr', 'aria-autocomplete', 'list')
        .click({force: true});
    });

    it('Type, See The Filter And Select A Value On Select Value Field', () => {
        //TYPE
        cy.get('#react-select-2-input').should('be.visible')
        .click({force: true}).type('root');

        //FILTERS AND SELECT A VALUE
        cy.get('#react-select-2-option-2').should('exist')
        .and('include.text', 'root')
        .and('have.length', 1);

        cy.get('#react-select-2-option-3').should('exist')
        .and('include.text', 'root')
        .and('have.length', 1)
        .click({force: true});

        //VERIFY SELECTED OPTION
        cy.get('div').contains('Another root option').should('be.visible');
    });

    it('The Results Were Not Found On Select Value Field', () => {
        //TYPE
        cy.get('#react-select-2-input').should('be.visible')
        .click({force: true}).type('others');

        //VERIFY SELECTED OPTION
        cy.get('div').contains('No options').should('be.visible');
    });

    it('Click On Select One Field', () => {
        cy.get('#react-select-3-input').should('be.visible')
        .and('have.attr', 'autocapitalize', 'none')
        .and('have.attr', 'autocomplete', 'off')
        .and('have.attr', 'autocorrect', 'off')
        .and('have.attr', 'spellcheck', 'false')
        .and('have.attr', 'aria-autocomplete', 'list')
        .click({force: true});
    });

    it('Type, See The Filter And Select A Value On Select One Field', () => {
        //TYPE
        cy.get('#react-select-3-input').should('be.visible')
        .click({force: true}).type('M');

        //FILTERS AND SELECT A VALUE
        cy.get('#react-select-3-option-0-1').should('exist')
        .and('include.text', 'M')
        .and('have.length', 1);

        cy.get('#react-select-3-option-0-3').should('exist')
        .and('include.text', 'M')
        .and('have.length', 1);

        cy.get('#react-select-3-option-0-2').should('exist')
        .and('include.text', 'M')
        .and('have.length', 1)
        .click({force: true});
        
        //VERIFY SELECTED OPTION
        cy.get('div').contains('Mrs.').should('be.visible');
    });


    it('The Results Were Not Found On Select One Field', () => {
        //TYPE
        cy.get('#react-select-3-input').should('be.visible')
        .click({force: true}).type('Master');

        //VERIFY SELECTED OPTION
        cy.get('div').contains('No options').should('be.visible');
    });

    it('Select A Color On The List', () => {
        //GET ALL COLORS
        cy.get('#oldSelectMenu').children().should('be.visible').and('have.length', 11).each(($color) => {
            //SELECT A COLOR
            cy.get('#oldSelectMenu').select($color.val());
        });
    });

    it('Click On Multiselect Drop Down', () => {
        cy.get('#react-select-4-input').should('be.visible')
        .and('have.attr', 'autocapitalize', 'none')
        .and('have.attr', 'autocomplete', 'off')
        .and('have.attr', 'autocorrect', 'off')
        .and('have.attr', 'spellcheck', 'false')
        .and('have.attr', 'aria-autocomplete', 'list')
        .click({force: true});
    });

    it('Select And Delete All Colors On Multiselect Drop Down', () => {
        //CLICK ON THE DROP DOWN
        cy.get('#react-select-4-input').should('be.visible').click({force: true});

        //GET ALL COLORS
        cy.get('.css-26l3qy-menu').children().children().should('be.visible').and('have.length', 4).each(($color, index) => {
            //SELECT COLORS
            cy.wrap($color).click({force: true});

            if(index === 3) {
                //VERIFY MESSAGE
                cy.get('div').contains('No options').should('be.visible');

                //REMOVE COLORS
                cy.get('.css-xb97g8').should('be.visible').and('have.length', 4).each(($deleteIcon) => {
                    //CLICK ON DELETE ICON
                    cy.wrap($deleteIcon).click({force: true});
                })
            }
        });
    });

    it('Delete All Colors On Multiselect Drop Down', () => {
        //CLICK ON THE DROP DOWN
        cy.get('#react-select-4-input').should('be.visible').click({force: true});

        //GET ALL COLORS
        cy.get('.css-26l3qy-menu').children().children().should('be.visible').and('have.length', 4).each(($color, index) => {
            //SELECT COLORS
            cy.wrap($color).click({force: true});

            if(index === 3) {
                //REMOVE ALL COLORS
                cy.get('.css-1wy0on6').last().children().eq(0).click({force: true});

                //VERIFY REMOVED COLORS
                cy.get('.css-26l3qy-menu').children().children().should('be.visible').and('have.length', 4);
            }
        });
    });

    it.only('Select A Car On Standard Multi Select', () => {
        cy.get('#cars').children().should('be.visible').and('have.length', 4).each(($car) => {
            //SELECT A CAR
            cy.get('#cars').select($car.val());
        })
    });
});