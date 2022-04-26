import { urlDataSet, newUrl, newUrlDataSet } from "./url_shortener_data";

describe('Add URL flow', ()=> {
    it('Should be add a URL to the form and POST it', ()=> {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', urlDataSet)
        cy.visit('http://localhost:3000')
        cy.get('form').then(($form) => {
            cy.contains('URL Shortener')
                .get('form [name="title"]').first()
                    .type('https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
                    .get('button').click()
                    cy.intercept({
                        method: 'POST',
                        url: 'http://localhost:3001/api/v1/urls',
                    }, newUrl)
                })
            })
    it('Should display new shortened URL in the DOM', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', newUrlDataSet)
        cy.visit('http://localhost:3000')
            .get('a').last()
                .contains('http://localhost:3001/useshorturl/3')
            .get('p').last()
                .contains('https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')      
    })
})