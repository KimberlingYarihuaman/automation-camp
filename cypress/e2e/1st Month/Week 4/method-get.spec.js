describe('Method GET', () => {

    it('Validate The Method GET For Books', () => {
        cy.request('GET','https://demoqa.com/BookStore/v1/Books').then((resp) =>{
            //STATUS CODE TO BE 200
            expect(resp.status).to.eq(200);

            //ARRAY
            expect(resp.body.books).to.be.an('array');
            expect(resp.body.books.length).to.eq(8);

            //HEADERS
            expect(resp.headers['content-length']).to.eq('4514');
            expect(resp.headers['content-type']).to.eq('application/json; charset=utf-8');
            expect(resp.headers['date']);
            expect(resp.headers['etag']).to.eq('W/"11a2-8zfX++QwcgaCjSU6F8JP9fUd1tY"');
            expect(resp.headers['server']).to.eq('nginx/1.17.10 (Ubuntu)');
            expect(resp.headers['x-powered-by']).to.eq('Express');

            //PROPERTIES
            expect(resp.body.books[0]).to.have.property('isbn').to.be.a('string').and.to.eq('9781449325862');
            expect(resp.body.books[0]).to.have.property('title').to.be.a('string').and.to.eq('Git Pocket Guide');
            expect(resp.body.books[0]).to.have.property('subTitle').to.be.a('string').and.to.eq('A Working Introduction');
            expect(resp.body.books[0]).to.have.property('author').to.be.a('string').and.to.eq('Richard E. Silverman');
            expect(resp.body.books[0]).to.have.property('publish_date').to.be.a('string').and.to.eq('2020-06-04T08:48:39.000Z');
            expect(resp.body.books[0]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[0]).to.have.property('pages').to.be.a('number').and.to.eq(234);
            expect(resp.body.books[0]).to.have.property('description').to.be.a('string').and.to.eq('This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp');
            expect(resp.body.books[0]).to.have.property('website').to.be.a('string').and.to.eq('http://chimera.labs.oreilly.com/books/1230000000561/index.html');
            console.log(resp.body.books[0].title);

            expect(resp.body.books[1]).to.have.property('isbn').to.be.a('string').and.to.eq('9781449331818');
            expect(resp.body.books[1]).to.have.property('title').to.be.a('string').and.to.eq('Learning JavaScript Design Patterns');
            expect(resp.body.books[1]).to.have.property('subTitle').to.be.a('string').and.to.eq("A JavaScript and jQuery Developer's Guide");
            expect(resp.body.books[1]).to.have.property('author').to.be.a('string').and.to.eq('Addy Osmani');
            expect(resp.body.books[1]).to.have.property('publish_date').to.be.a('string').and.to.eq('2020-06-04T09:11:40.000Z');
            expect(resp.body.books[1]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[1]).to.have.property('pages').to.be.a('number').and.to.eq(254);
            expect(resp.body.books[1]).to.have.property('description').to.be.a('string').and.to.eq("With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da");
            expect(resp.body.books[1]).to.have.property('website').to.be.a('string').and.to.eq('http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/');

            expect(resp.body.books[2]).to.have.property('isbn').to.be.a('string').and.to.eq('9781449337711');
            expect(resp.body.books[2]).to.have.property('title').to.be.a('string').and.to.eq('Designing Evolvable Web APIs with ASP.NET');
            expect(resp.body.books[2]).to.have.property('subTitle').to.be.a('string').and.to.eq('Harnessing the Power of the Web');
            expect(resp.body.books[2]).to.have.property('author').to.be.a('string').and.to.eq('Glenn Block et al.');
            expect(resp.body.books[2]).to.have.property('publish_date').to.be.a('string').and.to.eq('2020-06-04T09:12:43.000Z');
            expect(resp.body.books[2]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[2]).to.have.property('pages').to.be.a('number').and.to.eq(238);
            expect(resp.body.books[2]).to.have.property('description').to.be.a('string').and.to.eq('Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft');
            expect(resp.body.books[2]).to.have.property('website').to.be.a('string').and.to.eq('http://chimera.labs.oreilly.com/books/1234000001708/index.html');

            expect(resp.body.books[3]).to.have.property('isbn').to.be.a('string').and.to.eq('9781449365035');
            expect(resp.body.books[3]).to.have.property('title').to.be.a('string').and.to.eq('Speaking JavaScript');
            expect(resp.body.books[3]).to.have.property('subTitle').to.be.a('string').and.to.eq('An In-Depth Guide for Programmers');
            expect(resp.body.books[3]).to.have.property('author').to.be.a('string').and.to.eq('Axel Rauschmayer');
            expect(resp.body.books[3]).to.have.property('publish_date').to.be.a('string').and.to.eq('2014-02-01T00:00:00.000Z');
            expect(resp.body.books[3]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[3]).to.have.property('pages').to.be.a('number').and.to.eq(460);
            expect(resp.body.books[3]).to.have.property('description').to.be.a('string').and.to.eq('Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
            expect(resp.body.books[3]).to.have.property('website').to.be.a('string').and.to.eq('http://speakingjs.com/');

            expect(resp.body.books[4]).to.have.property('isbn').to.be.a('string').and.to.eq('9781491904244');
            expect(resp.body.books[4]).to.have.property('title').to.be.a('string').and.to.eq("You Don't Know JS");
            expect(resp.body.books[4]).to.have.property('subTitle').to.be.a('string').and.to.eq('ES6 & Beyond')
            expect(resp.body.books[4]).to.have.property('author').to.be.a('string').and.to.eq('Kyle Simpson');
            expect(resp.body.books[4]).to.have.property('publish_date').to.be.a('string').and.to.eq('2015-12-27T00:00:00.000Z');
            expect(resp.body.books[4]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[4]).to.have.property('pages').to.be.a('number').and.to.eq(278);
            expect(resp.body.books[4]).to.have.property('description').to.be.a('string').and.to.eq('No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \\\"You Don’t Know JS\\\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the st');
            expect(resp.body.books[4]).to.have.property('website').to.be.a('string').and.to.eq('https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond');

            expect(resp.body.books[5]).to.have.property('isbn').to.be.a('string').and.to.eq('9781491950296');
            expect(resp.body.books[5]).to.have.property('title').to.be.a('string').and.to.eq('Programming JavaScript Applications');
            expect(resp.body.books[5]).to.have.property('subTitle').to.be.a('string').and.to.eq('Robust Web Architecture with Node, HTML5, and Modern JS Libraries');
            expect(resp.body.books[5]).to.have.property('author').to.be.a('string').and.to.eq('Eric Elliott');
            expect(resp.body.books[5]).to.have.property('publish_date').to.be.a('string').and.to.eq('2014-07-01T00:00:00.000Z');
            expect(resp.body.books[5]).to.have.property('publisher').to.be.a('string').and.to.eq("O'Reilly Media");
            expect(resp.body.books[5]).to.have.property('pages').to.be.a('number').and.to.eq(254);
            expect(resp.body.books[5]).to.have.property('description').to.be.a('string').and.to.eq("Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flex");
            expect(resp.body.books[5]).to.have.property('website').to.be.a('string').and.to.eq('http://chimera.labs.oreilly.com/books/1234000000262/index.html');

            expect(resp.body.books[6]).to.have.property('isbn').to.be.a('string').and.to.eq('9781593275846');
            expect(resp.body.books[6]).to.have.property('title').to.be.a('string').and.to.eq('Eloquent JavaScript, Second Edition');
            expect(resp.body.books[6]).to.have.property('subTitle').to.be.a('string').and.to.eq('A Modern Introduction to Programming');
            expect(resp.body.books[6]).to.have.property('author').to.be.a('string').and.to.eq('Marijn Haverbeke');
            expect(resp.body.books[6]).to.have.property('publish_date').to.be.a('string').and.to.eq('2014-12-14T00:00:00.000Z');
            expect(resp.body.books[6]).to.have.property('publisher').to.be.a('string').and.to.eq("No Starch Press");
            expect(resp.body.books[6]).to.have.property('pages').to.be.a('number').and.to.eq(472);
            expect(resp.body.books[6]).to.have.property('description').to.be.a('string').and.to.eq('JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale ');
            expect(resp.body.books[6]).to.have.property('website').to.be.a('string').and.to.eq('http://eloquentjavascript.net/');

            expect(resp.body.books[7]).to.have.property('isbn').to.be.a('string').and.to.eq('9781593277574');
            expect(resp.body.books[7]).to.have.property('title').to.be.a('string').and.to.eq('Understanding ECMAScript 6');
            expect(resp.body.books[7]).to.have.property('subTitle').to.be.a('string').and.to.eq('The Definitive Guide for JavaScript Developers');
            expect(resp.body.books[7]).to.have.property('author').to.be.a('string').and.to.eq('Nicholas C. Zakas');
            expect(resp.body.books[7]).to.have.property('publish_date').to.be.a('string').and.to.eq('2016-09-03T00:00:00.000Z');
            expect(resp.body.books[7]).to.have.property('publisher').to.be.a('string').and.to.eq("No Starch Press");
            expect(resp.body.books[7]).to.have.property('pages').to.be.a('number').and.to.eq(352);
            expect(resp.body.books[7]).to.have.property('description').to.be.a('string').and.to.eq('ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E');
            expect(resp.body.books[7]).to.have.property('website').to.be.a('string').and.to.eq('https://leanpub.com/understandinges6/read');
        })
    });
});