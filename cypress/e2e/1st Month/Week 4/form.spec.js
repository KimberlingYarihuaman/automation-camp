describe('Automation Practice Form', () => {

    beforeEach(() => {
        cy.visit('/automation-practice-form');
    })

    /*********************   GLOBAL CONSTANT   *********************/
    const date= new Date();

    const personalData= {
        name: 'Kimberling',
        lastName: 'Yarihuaman',
        email: 'kimberling.yarihuaman@applydigital.com',
        mobile: '6728189000',
        month: 'March',
        year: '1997',
        fileName: 'testing_file.pdf',
        currentAddress: 'Plaza de Leon, 5, 34005, Piso 5B, Palencia, España'
    }

    /*********************   GLOBAL FUNCTIONS  *********************/

    //GET CORRECT DAY FORMAT
    function getDayFormat(currentDay)  {
        let day = currentDay;
          
        if(currentDay>=1 && currentDay<=9) {
            day = `0${currentDay}`;
        }
        return day;
    }

    //GET MONTH
    function getMonth(monthNumber) {

        let monthName="";

        switch(monthNumber) {

            case 0:
                monthName= 'Jan';
            break;

            case 1:
                monthName= "Feb"
            break;

            case 2:
                monthName = "Mar"
            break;

            case 3:
                monthName= "Apr"
            break;

            case 4:
                monthName = "May"
            break;

            case 5:
                monthName = "Jun"
            break;

            case 6:
                monthName = "Jul"
            break;

            case 7:
                monthName = "Aug"
            break;

            case 8:
                monthName = "Sep"
            break;

            case 9:
                monthName = "Oct"
            break;

            case 10:
                monthName = "Nov"
            break;

            case 11:
                monthName = "Dec"
            break;
        }
        return monthName;
    }

    it('Validate The Fields For The Form And Modal Showed', () => {
        let optionValue = 0, hobbies="";

        //NAME
        cy.get('#userName-label').should('be.visible').and('have.text', 'Name');
        cy.get('#firstName').should('be.visible')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'placeholder','First Name')
        .and('have.attr', 'required');
        cy.get('#firstName').type(personalData.name);

        //LASTNAME
        cy.get('#lastName').should('be.visible')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'placeholder','Last Name')
        .and('have.attr', 'required');
        cy.get('#lastName').type(personalData.lastName);

        //EMAIL
        cy.get('#userEmail-label').should('be.visible').and('have.text', 'Email');
        cy.get('#userEmail').should('be.visible')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'placeholder','name@example.com')
        .type(personalData.email);

        //GENDER
        cy.get('#genterWrapper').children().eq(0).should('be.visible').and('have.text', 'Gender');
        cy.get('#genterWrapper').children().eq(1).children().should('be.visible').and('have.length',3).each(($gender) => {   
            //VALIDATE GENDER OPTIONS
            cy.wrap($gender).children().eq(0).should('exist')
            .and('have.attr', 'value', $gender.text())
            .and('have.attr', 'required');

            //SELECT AN OPTION
            cy.wrap($gender).children().eq(0).click({force: true});
        })

        //MOBILE
        cy.get('#userNumber-label').should('be.visible').and('have.text', 'Mobile(10 Digits)');
        cy.get('#userNumber').should('be.visible')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'placeholder','Mobile Number')
        .and('have.attr', 'minlength','10')
        .and('have.attr', 'maxlength','10')
        .and('have.attr', 'required');
        cy.get('#userNumber').type(personalData.mobile);

        //DATE OF BIRTH
        cy.get('#dateOfBirth-label').should('be.visible').and('have.text', 'Date of Birth');
        cy.get('#dateOfBirthInput').should('be.visible')
        .and('have.attr', 'value', getDayFormat(date.getDate())+' '+getMonth(date.getMonth())+' '+date.getFullYear());

        //SELECT A DATE IN THE CALENDAR
        cy.get('#dateOfBirthInput').should('be.visible').click({force: true});
        cy.get('.react-datepicker__month-select').select(personalData.month);
        cy.get('.react-datepicker__year-select').select(personalData.year);
        cy.get('.react-datepicker__month').children().eq(4).children().eq(0).should('be.visible').click({force: true});

        //SUBJECT
        cy.get('#subjects-label').should('be.visible').and('have.text', 'Subjects');
        cy.get('#subjectsInput').should('be.visible')
        .and('have.attr', 'autocapitalize','none')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'autocorrect','off')
        .and('have.attr', 'spellcheck','false')
        .and('have.attr', 'aria-autocomplete','list')
        .type('a');
        cy.get('.subjects-auto-complete__menu').children().children().should('be.visible').and('have.length', 4).each(($subject, subjectIndex) => {
            //DIFFERENT TO MATH
            if(subjectIndex!=0) {
                //FIND THE SUBJECT
                cy.get('#subjectsInput').click({force: true}).type('a');
            }
            //SELECT A SUBJECT
            cy.get('div').contains($subject.text()).click({force: true});
        });

        //HOBBIES
        cy.get('#hobbiesWrapper').children().eq(0).should('be.visible').and('have.text', ' Hobbies');
        cy.get('#hobbiesWrapper').children().eq(1).children().should('be.visible').and('have.length',3).each(($hobbies, index) => {   
            //VALIDATE HOBBIES OPTIONS
            optionValue = index+1;
            cy.wrap($hobbies).children().eq(0).should('exist').and('have.attr', 'value', optionValue);

            switch(optionValue) {
                case 1:
                    hobbies = "Sports";
                break;

                case 2:
                    hobbies = "Reading";
                break;

                case 3:
                    hobbies = "Music";
                break;
            }
            //VERIFY OPTION TEXT
            cy.wrap($hobbies).children().eq(1).should('exist').and('have.text',hobbies);

            //SELECT AN OPTION
            cy.wrap($hobbies).children().eq(0).click({force: true});
        })

        //SELECT A PICTURE
        cy.get('label').contains('Picture').should('be.visible');
        cy.get('label').contains('Select picture').should('be.visible');
        cy.get('#uploadPicture').should('be.visible')
        .and('have.attr', 'type', 'file')
        .and('have.attr','lang','en');
        cy.fixture(personalData.fileName).then(fileContent => {
            cy.get('#uploadPicture').attachFile({
              fileContent,
              fileName: personalData.fileName,
              mimeType: 'tipo-mime'
            });
        });

        //CURRENT ADDRESS
        cy.get('#currentAddress-label').should('be.visible').and('have.text', 'Current Address');
        cy.get('#currentAddress').should('be.visible')
        .and('have.attr', 'placeholder', 'Current Address')
        .type(personalData.currentAddress);

        //STATE AND CITY
        cy.get('#stateCity-label').should('be.visible').and('have.text', 'State and City');
        cy.get('#react-select-3-input').should('be.visible')
        .and('have.attr', 'autocapitalize','none')
        .and('have.attr', 'autocomplete','off')
        .and('have.attr', 'autocorrect','off')
        .and('have.attr', 'spellcheck','false')
        .and('have.attr', 'aria-autocomplete','list')
        .click({force: true});
        cy.get('.css-26l3qy-menu').children().children().should('be.visible').each(($state, stateIndex) => {
            //DIFFERENT TO NCR OPTION (BECAUSE HAVE A ISSUE)
            if(stateIndex!=0) {
                //CLICK ON STATE
                cy.get('#react-select-3-input').should('exist').click({force: true})

                //SELECT A STATE
                cy.get('div').contains($state.text()).should('exist').click({force: true});
            
                //CLICK ON CITY
                cy.get('#react-select-4-input').should('exist').click({force: true});

                cy.get('.css-26l3qy-menu').children().children().should('be.visible').each(($city) => {
                    //CLICK ON CITY
                    cy.get('#react-select-4-input').should('exist').click({force: true});
                    
                    //SELECT A CITY
                    cy.get('div').contains($city.text()).should('exist').click({force: true});
                });
            }
        });
        //CLICK ON SUBMIT BUTTON
        cy.get('#submit').should('be.visible').click({force: true});

        //VERIFY MODAL EXISTS
        cy.get('.modal-content').should('be.visible').within(() => {
            //HEADER
            cy.get('.modal-header').should('be.visible').within(() => {
                cy.wrap('Thanks for submitting the form');
            });
            //BODY
            cy.get('.modal-body').should('be.visible').within(() => {
                cy.get('tbody').children().eq(0).contains('Student Name');
                cy.get('tbody').children().eq(0).contains(personalData.name);
                cy.get('tbody').children().eq(0).contains(personalData.lastName);
                cy.get('tbody').children().eq(1).contains('Student Email');
                cy.get('tbody').children().eq(1).contains(personalData.email);
                cy.get('tbody').children().eq(2).contains('Gender');
                cy.get('tbody').children().eq(2).contains('Other');
                cy.get('tbody').children().eq(3).contains('Mobile');
                cy.get('tbody').children().eq(3).contains(personalData.mobile);
                cy.get('tbody').children().eq(4).contains('Date of Birth');
                cy.get('tbody').children().eq(4).contains('23 '+personalData.month+','+personalData.year);
                cy.get('tbody').children().eq(5).contains('Subject');
                cy.get('tbody').children().eq(5).contains('Accounting, Arts, Social Studies');
                cy.get('tbody').children().eq(6).contains('Hobbies');
                cy.get('tbody').children().eq(6).contains('Sports, Reading, Music');
                cy.get('tbody').children().eq(7).contains('Picture');
                cy.get('tbody').children().eq(7).contains(personalData.fileName);
                cy.get('tbody').children().eq(8).contains('Address');
                cy.get('tbody').children().eq(8).contains(personalData.currentAddress);
                cy.get('tbody').children().eq(9).contains('State and City');
                cy.get('tbody').children().eq(9).contains('Rajasthan Jaiselmer');
            });
            //FOOTER
            cy.get('.modal-footer').should('be.visible').within(() => {
                //CLOSE BUTTON
                cy.get('#closeLargeModal').should('be.visible').click({force: true});
                cy.get('#modal-content').should('not.exist');
            });
        })
    });

    it('Remove Elements On Subject List Clicking On Icon For Each Element', () => {
        //ADD SUBJECTS
        cy.get('#subjectsInput').should('be.visible').type('a');
        cy.get('.subjects-auto-complete__menu').children().children().should('be.visible').and('have.length', 4).each(($subject, subjectIndex) => {
            //DIFFERENT TO MATH
            if(subjectIndex!=0) {
                //FIND THE SUBJECT
                cy.get('#subjectsInput').click({force: true}).type('a');
            }
            //SELECT A SUBJECT
            cy.get('div').contains($subject.text()).click({force: true});
        });
        //REMOVE SUBJECTS
        cy.get('#subjectsContainer').children().children().eq(2).children().should('be.visible').and('have.length.gte', 3).each(($subject, index) => {

            if(index!=3) {
                //CLICK ON REMOVE ICON
                cy.wrap($subject).children().eq(1).should('be.visible').click({force: true});
            }
        });
    });

    it('Remove All Elements On Subject List', () => {
        //ADD SUBJECTS
        cy.get('#subjectsInput').should('be.visible').type('a');
        cy.get('.subjects-auto-complete__menu').children().children().should('be.visible').and('have.length', 4).each(($subject, subjectIndex) => {
            //DIFFERENT TO MATH
            if(subjectIndex!=0) {
                //FIND THE SUBJECT
                cy.get('#subjectsInput').click({force: true}).type('a');
            }
            //SELECT A SUBJECT
            cy.get('div').contains($subject.text()).click({force: true});
        });
        //REMOVE ALL SUBJECTS
        cy.get('#subjectsContainer').children().children().eq(3).children().eq(0).should('be.visible').click({force: true});
    });
});