describe('Date Picker', () => {

    beforeEach(() => {
        cy.visit('/date-picker');
    });

    /*********************   GLOBAL CONSTANT   *********************/
    const date= new Date();

    /*********************   FUNCTIONS   *********************/
    //GET CORRECT MONTH FORMAT
    function getMonthFormat(currentMonth)  {
        let month = currentMonth;
          
        if(currentMonth>=1 && currentMonth<=9) {
            month = `0${currentMonth}`;
        }
        return month;
    }

    //GET CORRECT TIME FORMAT
    function getTimeFormat(hours= date.getHours(), minutes= date.getMinutes()) {

        //DETERMINE AM OR PM
        const period = (hours >= 12) ? 'PM' : 'AM';

        //CONVERT THE HOURS TO 12 FORMAT
        hours = hours % 12;
        hours = (hours === 0) ? 12 : hours;

        return  hours+':'+minutes+ ' '+period;
    }

    //GET MONTH
    function getMonth(month) {

        let monthValues = {
            value: 0,
            text: ""
        }
        
        switch(month) {

            case 'January':
            case 0:
                monthValues.value = 0;
                monthValues.text = 'January';
            break;

            case 'February':
            case 1:
                monthValues.value = 1;
                monthValues.text = "February"
            break;

            case 'March':
            case 2:
                monthValues.value = 2;
                monthValues.text = "March"
            break;

            case 'April':
            case 3:
                monthValues.value = 3;
                monthValues.text = "April"
            break;

            case 'May':
            case 4:
                monthValues.value = 4;
                monthValues.text = "May"
            break;

            case 'June':
            case 5:
                monthValues.value = 5;
                monthValues.text = "June"
            break;

            case 'July':
            case 6:
                monthValues.value = 6;
                monthValues.text = "July"
            break;

            case 'August':
            case 7:
                monthValues.value = 7;
                monthValues.text = "August"
            break;

            case 'September':
            case 8:
                monthValues.value = 8;
                monthValues.text = "September"
            break;

            case 'October':
            case 9:
                monthValues.value = 9;
                monthValues.text = "October"
            break;

            case 'November':
            case 10:
                monthValues.value = 10;
                monthValues.text = "November"
            break;

            case 'December':
            case 11:
                monthValues.value = 11;
                monthValues.text = "December"
            break;
        }
        return monthValues;
    }

    /*********************   TEST CASES - SELECT DATE   *********************/

    it('Validate The Date On Date Picker', () => {
        const currentDate = getMonthFormat(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

        //VALIDATE DATE FIELD
        cy.get('#datePickerMonthYearInput').should('be.visible').and('have.attr', 'value', currentDate);
    });

    it('Validate The Values Of Months List And Days Names', () => {
        let month="";

       //CLICK ON CALENDAR
        cy.get('#datePickerMonthYearInput').should('be.visible').click({force: true});

        //MONTHS
        cy.get('.react-datepicker__month-select').children().should('be.visible').and('have.length', 12).each(($month) =>{
            //SELECT A MONTH
            month = $month.text();
            cy.get('.react-datepicker__month-select').select(month);
            
            //CHECK VALUES
            cy.wrap($month).should('be.visible').and('have.attr','value', getMonth(month).value);
            cy.wrap($month).invoke('text').should('eq', getMonth(month).text);
        })

        //DAYS NAMES
        cy.get('.react-datepicker__day-names').children().should('be.visible').and('have.length', 7);
    });

    it('Validate The Values Of Years List', () => {
        let year = 0;

        //CLICK ON CALENDAR
        cy.get('#datePickerMonthYearInput').should('be.visible').click({force: true});

        //YEARS
        cy.get('.react-datepicker__year-select').children().should('be.visible').and('have.length', 201).each(($year) =>{
            //SELECT A YEAR
            year = $year.text();
            cy.get('.react-datepicker__year-select').select(year);

            //VALIDATE HIGHER AND LOWER YEAR
            switch(year) {

                case '1900':
                    cy.wrap($year).should('be.visible').and('have.attr','value', '1900');
                    cy.wrap($year).invoke('text').should('eq', '1900');
                break;

                case '2100':
                    cy.wrap($year).should('be.visible').and('have.attr','value', '2100');
                    cy.wrap($year).invoke('text').should('eq', '2100');
                break;
            }
        })
    });

    it('Validate The Day, Month And Year Selected To Be Shown Correctly', () => {
        let day='29',month="March",year="1997";

        //CLICK ON CALENDAR
        cy.get('#datePickerMonthYearInput').should('be.visible').click({force: true});

        //SELECT A MONTH AND YEAR
        cy.get('.react-datepicker__month-select').select(month);
        cy.get('.react-datepicker__year-select').select(year);

        //VALIDATE THE TAG
        cy.get('.react-datepicker__header').children().first().should('be.visible')
        .and('have.text', month+" "+year);

        //SELECT A DAY
        cy.get('.react-datepicker__month').children().eq(4).children().eq(6).should('be.visible').click({force: true});

        //CHECK THE DATE FIELD
        cy.get('#datePickerMonthYearInput').should('be.visible').and('have.attr', 'value', `${getMonthFormat(getMonth(month).value+1)}/${day}/${year}`);
    });

    it('Validate Previous And Next Buttons', () => {
       //CLICK ON CALENDAR
       cy.get('#datePickerMonthYearInput').should('be.visible').click({force: true});

       //CLICK ON PREVIOUS BUTTON
       cy.get('button').contains('Previous Month').should('be.visible').click({force: true});
       cy.get('.react-datepicker__header').children().first().should('not.have.text', getMonth(date.getMonth()).text+" "+date.getFullYear());

       //CLICK ON NEXT BUTTON
       cy.get('button').contains('Next Month').should('be.visible').click({force: true});
       cy.get('.react-datepicker__header').children().first().should('have.text', getMonth(date.getMonth()).text+" "+date.getFullYear());
    });

    /*********************   TEST CASES - SELECT DATE AND TIME   *********************/

    it('Validate The Date On TimePicker', () => {

        const currentDateTime = getMonth(date.getMonth()).text+' '+date.getDate()+', '+date.getFullYear() +' '+getTimeFormat();

        //VALIDATE DATE FIELD
        cy.get('#dateAndTimePickerInput').should('be.visible').and('have.attr', 'value', currentDateTime);
    });

    it('Validate The Values Of Months List And Days On TimePicker', () => {
        let month="";

       //CLICK ON CALENDAR
        cy.get('#dateAndTimePickerInput').should('be.visible').click({force: true});

        //CLICK ON MONTH LIST
        cy.get('.react-datepicker__month-read-view').click({force: true});

        //MONTHS
        cy.get('.react-datepicker__month-dropdown').children().should('be.visible').and('have.length', 12).each(($month) =>{
            //CLICK ON MONTH LIST
            cy.get('.react-datepicker__month-read-view').click({force: true});

            //SELECT A MONTH
            month = $month.text();
            cy.get('.react-datepicker__month-option').contains(month).click();
            
            //CHECK VALUES
            cy.wrap($month).invoke('text').should('eq', month);
        })

        //DAYS NAMES
        cy.get('.react-datepicker__day-names').children().should('be.visible').and('have.length', 7);
    });

    it('Validate The Values Of Years List And Click On Buttons', () => {
        //CLICK ON CALENDAR
        cy.get('#dateAndTimePickerInput').should('be.visible').click({force: true});

        //CLICK ON YEARS LIST
        cy.get('.react-datepicker__year-read-view').should('be.visible').click({force: true});

        //CHECK VALUES
        cy.get('.react-datepicker__year-dropdown').children().should('be.visible').and('have.length.gte', 11);

        //YEARS UPCOMING
        cy.get('.react-datepicker__year-dropdown').children().first().should('be.visible').click({force: true});

        //YEARS PREVIOUS
        cy.get('.react-datepicker__year-dropdown').children().last().should('be.visible').click({force: true});
    });


    it('Validate The Values Of Time List On TimePicker', () => {
        //CLICK ON CALENDAR
        cy.get('#dateAndTimePickerInput').should('be.visible').click({force: true});

        //CHECK VALUES
        cy.get('.react-datepicker__time-list').children().should('be.visible').and('have.length', 96);
    });


    it('Validate The Day, Month, Year And Time Selected To Be Shown Correctly On TimePicker', () => {
        let day='14',month="October",year="2020",hour="18",minutes="30";

        //CLICK ON CALENDAR
        cy.get('#dateAndTimePickerInput').should('be.visible').click({force: true});

        //SELECT A YEAR
        cy.get('.react-datepicker__year-read-view').should('be.visible').click({force: true});
        cy.get('.react-datepicker__year-dropdown').children().contains(year).click({force: true});

        //SELECT A MONTH
        cy.get('.react-datepicker__month-read-view').should('be.visible').click({force: true});
        cy.get('.react-datepicker__month-dropdown').children().contains(month).click({force: true});

        //VALIDATE THE TAG
        cy.get('.react-datepicker__header').children().first().should('be.visible')
        .and('have.text', month+" "+year);

        //SELECT A DAY
        cy.get('.react-datepicker__month').children().eq(2).children().eq(3).should('be.visible').click({force: true});

        //SELECT A TIME
        cy.get('.react-datepicker__time-list').children().contains(hour+':'+minutes).click({force: true});

        //CHECK THE DATE AND TIME FIELD
        cy.get('#dateAndTimePickerInput').should('be.visible')
        .and('have.attr', 'value', month+' '+day+', '+year+' '+getTimeFormat(hour,minutes));
    });

    it('Validate Previous And Next Buttons On TimePicker', () => {
        //CLICK ON CALENDAR
        cy.get('#dateAndTimePickerInput').should('be.visible').click({force: true});
 
        //CLICK ON PREVIOUS BUTTON
        cy.get('button').contains('Previous Month').should('be.visible').click({force: true});
        cy.get('.react-datepicker__header').children().first().should('not.have.text', getMonth(date.getMonth()).text+" "+date.getFullYear());
 
        //CLICK ON NEXT BUTTON
        cy.get('button').contains('Next Month').should('be.visible').click({force: true});
        cy.get('.react-datepicker__header').children().first().should('have.text', getMonth(date.getMonth()).text+" "+date.getFullYear());
     });
});