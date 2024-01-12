describe('Check Box', () => {

    beforeEach(() => {
        cy.visit('/checkbox');
    });

    it('Check And Select All The CheckBoxes', () => {
        //VERIFY IF THE CHECKBOX EXISTS
        cy.get('#tree-node-home').should('exist').check({force: true});

        //MESSAGE
        cy.get('#result').should('be.visible');
    });


    it('Click On Expand All Button And Verify CheckBoxes', () => {
        //CLICK ON EXPAND ALL BUTTON
        cy.get('[aria-label="Expand all"]').click();

        //VERIFY DISPLAYED CHECKBOXES
        cy.get('ol').contains('Desktop').should('be.visible');
        cy.get('ol').contains('Documents').should('be.visible');
        cy.get('ol').contains('Downloads').should('be.visible');
    });


    it('Click On Collapse All Button And Verify CheckBoxes', () => {
        //CLICK ON EXPAND ALL BUTTON
        cy.get('[aria-label="Expand all"]').click({force: true});

        //CLICK ON COLLAPSE ALL BUTTON
        cy.get('[aria-label="Collapse all"]').click({force: true});

        //VERIFY HIDDEN CHECKBOXES
        cy.get('ol').contains('Desktop').should('not.exist');
        cy.get('ol').contains('Documents').should('not.exist');
        cy.get('ol').contains('Downloads').should('not.exist');
    });

    it('Click On Toggle Buttons And Expand CheckBoxes', () => {
        //OPEN HOME FOLDER
        cy.get('button[aria-label="Toggle"]').should('be.visible').click({force: true});

        cy.get('button[aria-label="Toggle"]').should('be.visible').and('have.length', 4).each(($el, index) => {
            //OPEN FOLDERS DIFFERENT TO HOME FOLDER
            if(index!=0) {
                cy.wrap($el).click({force: true});

                //OPEN SUB-FOLDERS FROM DOCUMENTS
                if(index===2) {
                    cy.get('button[aria-label="Toggle"]').should('be.visible').and('have.length', 6).each(($subFolder, index) => {
                        if(index===3 || index===4) {
                            cy.wrap($subFolder).click({force: true});
                        }
                    })
                }
            }
        })
    });

    it('Click On Toggle Buttons And Collapse CheckBoxes', () => {
        //CLICK ON EXPAND ALL BUTTON
        cy.get('[aria-label="Expand all"]').click();

        //CLOSE FOLDERS DIFFERENT TO HOME AND DOCUMENTS
        cy.get('button[aria-label="Toggle"]').should('be.visible').and('have.length', 6).each(($el, index) => {
            if(index!=0 && index!=2) {
                cy.wrap($el).click({force: true});
            }
        })
        //CLOSE HOME AND DOCUMENTS FOLDERS
        cy.get('button[aria-label="Toggle"]').should('be.visible').and('have.length', 6).each(($otherFolders, index) => {
            if(index===2) {
                //DOCUMENTS
                cy.wrap($otherFolders).click({force: true});
                //HOME
                cy.get('button[aria-label="Toggle"]').eq(0).click({force: true});
            }
        })
    });

    it('Check And Uncheck All Checkboxes', () => {
        let desktop = ['desktop','notes', 'commands'], 
            documents = ['documents', 'workspace','react', 'angular', 'veu', 'office', 'public', 'private', 'classified', 'general'],
            downloads = ['downloads','wordFile', 'excelFile']; 

        //RETURN SELECTORS
        function getSelector(name) {
            let selector = '#tree-node-'+ name;
            return selector;
        }
        //CLICK ON EXPAND ALL BUTTON
        cy.get('[aria-label="Expand all"]').click();

        //ALL CHECKBOXES
        cy.get('label[for]').should('be.visible').and('have.length', 17).each(($element) => {
            //NAME OF PARENT CHECKBOX
            cy.get($element).children().last().invoke('text').then(checkboxName => {
               
                switch (checkboxName) {

                    case 'Desktop':
                        //CHECK
                        cy.get(getSelector(desktop[1])).should('exist').check({force: true});
                        cy.get(getSelector(desktop[2])).should('exist').check({force: true});
                        //MESSAGE
                        cy.get('div#result>span').should('have.text', 'You have selected :'+ desktop.join(""));
                        //UNCHECK
                        cy.get(getSelector(desktop[1])).should('exist').uncheck({force: true});
                        cy.get(getSelector(desktop[2])).should('exist').uncheck({force: true});
                    break;

                    case 'Documents':
                        //CHEKBOXES
                        cy.get(getSelector(documents[2])).should('exist').check({force: true});
                        cy.get(getSelector(documents[3])).should('exist').check({force: true});
                        cy.get(getSelector(documents[4])).should('exist').check({force: true});
                        cy.get(getSelector(documents[6])).should('exist').check({force: true});
                        cy.get(getSelector(documents[7])).should('exist').check({force: true});
                        cy.get(getSelector(documents[8])).should('exist').check({force: true});
                        cy.get(getSelector(documents[9])).should('exist').check({force: true});
                        //MESSAGE
                        cy.get('div#result>span').should('have.text', 'You have selected :'+ documents.join(""));
                        //UNCHECK
                        cy.get(getSelector(documents[2])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[3])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[4])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[6])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[7])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[8])).should('exist').uncheck({force: true});
                        cy.get(getSelector(documents[9])).should('exist').uncheck({force: true});
                    break;
    
                    case 'Downloads':
                        //CHEKBOXES
                        cy.get(getSelector(downloads[1])).should('exist').check({force: true});
                        cy.get(getSelector(downloads[2])).should('exist').check({force: true});
                        //MESSAGE
                        cy.get('div#result>span').should('have.text', 'You have selected :'+ downloads.join(""));
                        //UNCHECK
                        cy.get(getSelector(downloads[1])).should('exist').uncheck({force: true});
                        cy.get(getSelector(downloads[2])).should('exist').uncheck({force: true});
                    break;
                }
            })
        })
    }); 
});