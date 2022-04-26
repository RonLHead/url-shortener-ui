describe('Add URL flow', ()=> {
    it('Should be add a URL to the form and POST it', ()=> {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'mock_data_1.json' })
        cy.visit('http://localhost:3000')
        cy.get('form').then(($form) => {
            cy.contains('URL Shortener')
                .get('form [name="title"]').first()
                    .type('Mountain photo')
                .get('input').first()
                    .invoke('attr', 'value')
                    .should('contain', 'Mountain photo')
                .get('form [name="urlToShorten"]')
                    .type('https://media.istockphoto.com/photos/aerial-view-of-misty-mountains-at-sunrise-picture-id1195458582?k=20&m=1195458582&s=612x612&w=0&h=gzpAJTwppTIEAhNbUaHnjuRQoYon0F4C87UQ3xXv1oU=')
                .get('input').next()
                    .invoke('attr', 'value')
                    .should('contain', 'https://media.istockphoto.com/photos/aerial-view-of-misty-mountains-at-sunrise-picture-id1195458582?k=20&m=1195458582&s=612x612&w=0&h=gzpAJTwppTIEAhNbUaHnjuRQoYon0F4C87UQ3xXv1oU=')
            cy.intercept('POST', 'http://localhost:3001/api/v1/urls', { fixture: 'mock_data_post.json' })
                .get('button').click()
        })
    })
    it('Should display new shortened URL in the DOM', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'mock_data_2.json' })
        cy.visit('http://localhost:3000')
        cy.get('a').last()
                .contains('http://localhost:3001/useshorturl/3')
            .get('p').last()
                .contains('https://media.istockphoto.com/photos/aerial-view-of-misty-mountains-at-sunrise-picture-id1195458582?k=20&m=1195458582&s=612x612&w=0&h=gzpAJTwppTIEAhNbUaHnjuRQoYon0F4C87UQ3xXv1oU=')      
    })
})