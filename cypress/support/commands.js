Cypress.Commands.add('getTokenAdmin', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8089/api/v1/auth',
        body: {
            email: "admin@email.com",
            senha: "654321"
        }
    }).its('body.data.token').should('not.be.empty').then(token => {
        return token
    })
})

Cypress.Commands.add('getTokenUser', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8089/api/v1/auth',
        body: {
            email: "usuario@email.com",
            senha: "123456"
        }
    }).its('body.data.token').should('not.be.empty').then(token => {
        return token
    })
})
