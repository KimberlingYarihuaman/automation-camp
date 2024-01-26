describe('Menu', () => {

    beforeEach(() => {
        cy.visit('/menu');
    });

    it('Check Items Exist', () => {
        cy.get('#nav>li').children('a').should('exist').and('have.length', 3).each(($item, index) =>{
            //VERIFY LINK
            cy.wrap($item).should('have.attr', 'href', '#');

            //VERIFY TEXT ON LINK
            cy.wrap($item).should('have.text', 'Main Item '+(index+1));

            //CLICK ON THE LINK
            cy.wrap($item).click({force: true});
        });
    });

    it('Check Sub Links For Main Item 2 Option', () => {

        cy.get('#nav>li').children().should('exist').each(($link, linkIndex) => {

            if(linkIndex===2) {
                //MOUSE OVER
                cy.wrap($link).trigger('mouseover', {force: true}).children().children('a').should('exist')
                .and('have.length', 3).each(($item) => {
                    //VERIFY LINK
                    cy.wrap($item).should('have.attr', 'href', '#');

                    //VERIFY TEXT ON LINK
                    expect(($item.text()).toLowerCase()).to.include('sub');

                    //CLICK ON THE LINK
                    cy.wrap($item).click({force: true});
                })
            }
        })
    });

    it('Check Sub Sub Links For Sub Sub List Option', () => {
        
        cy.get('#nav>li').children().should('exist').each(($link, linkIndex) => {

            if(linkIndex===2) {
                //MOUSE OVER TO MAIN ITEM 2
                cy.wrap($link).trigger('mouseover', {force: true}).children().children().should('exist').each(($item, itemIndex) => {
                    
                    if(itemIndex===3) {
                        //MOUSE OVER TO SUB SUB LIST
                        cy.wrap($item).trigger('mouseover', {force: true}).children().children('a').should('exist')
                        .and('have.length', 2).each(($subSubList, subSubListIndex) => {
                            //VERIFY LINK
                            cy.wrap($subSubList).should('have.attr', 'href', '#');
        
                            //VERIFY TEXT ON LINK
                            cy.wrap($subSubList).should('have.text', 'Sub Sub Item '+(subSubListIndex+1));
        
                            //CLICK ON THE LINK
                            cy.wrap($subSubList).click({force: true});
                        })
                    }
                })
            }
        })
    });
});