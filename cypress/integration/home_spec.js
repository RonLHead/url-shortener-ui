import urlDataSet from "./url_shortener_data";

describe('Home page flow', ()=> {
    it('Should be able to visist the app and render the correct elements', ()=> {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', urlDataSet)
        cy.visit('http://localhost:3000')
            .contains('URL Shortener')
            .get('form')
            .get('div')
                .should('have.class', 'url')
            .get('h3')
                .contains('Awesome photo')
            .get('a')
                .contains("http://localhost:3001/useshorturl/1")
            .get('p')
                .contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
                .get('div')
                .should('have.class', 'url')
            .get('h3')
                .contains('Awesome photo')
            .get('a')
                .contains('http://localhost:3001/useshorturl/2')
            .get('p')
                .contains('https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80')
    })
    it('Should be able to visist the app and view the form with the proper inputs', ()=> {
        cy.get('form [name="title"]').first()
            .get('input').first()
                .invoke('attr', 'placeholder')
                .should('contain', 'Title...')
            .get('form [name="title"]').first()
            .get('input').next()
                .invoke('attr', 'placeholder')
                .should('contain', 'URL to Shorten...')
            .get('button')
                .contains('Shorten Please!')
    })
    it('Should be able to fill out the form and render the correct information in the input fields', ()=> {
        cy.get('form').then(($form) => {
            cy.contains('URL Shortener')
                .get('form [name="title"]').first()
                    .type('https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                .get('input').first()
                    .invoke('attr', 'value')
                    .should('contain', 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                .get('input').next()
                    .invoke('attr', 'value')
                    .should('contain', 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
        })
    })
})