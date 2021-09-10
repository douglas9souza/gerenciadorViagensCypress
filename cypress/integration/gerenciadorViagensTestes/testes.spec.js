
describe('Testes API Rest Gerenciador de viagens', () => {
        
    it('Cadastrar uma viagem', () => {
        cy.getTokenAdmin().then(token => {
            cy.request({
                url: '/v1/viagens',
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    "acompanhante": "Douglas",
                    "dataPartida": "2022-01-01",
                    "dataRetorno": "2022-01-10",
                    "localDeDestino": "Recife",
                    "regiao": "Nordeste"
                }
            }).as('response')
        })

        cy.get('@response').then(resp => {
            expect(resp.status).to.be.equal(201)
            expect(resp.body.data).to.have.property('id')
            expect(resp.body.data).to.have.property('acompanhante', 'Douglas')
            expect(resp.body.data).to.have.property('dataPartida', '2022-01-01')
            expect(resp.body.data).to.have.property('dataRetorno', '2022-01-10')
            expect(resp.body.data).to.have.property('localDeDestino', 'Recife')
            expect(resp.body.data).to.have.property('regiao', 'Nordeste')
        })
    })

    it('Consultar viagens cadastradas', () => {
        cy.getTokenUser().then(token => {
            cy.request({
                url: '/v1/viagens',
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            }).as('response')
        })

        cy.get('@response').then(resp => {
            expect(resp.status).to.be.equal(200)
            expect(resp.body).not.be.null
    })
})

    it('Editar uma viagem', () => {
        cy.getTokenUser().then(token => {
            cy.request({
                url: '/v1/viagens',
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
                qs: {
                    acompanhante: "Douglas"
                }
            }).then(resp => {
                cy.getTokenAdmin().then(token => {
                    cy.request({
                        url: `/v1/viagens/${resp.body.data[0].id}`,
                        method: 'PUT',
                        headers: { Authorization: `Bearer ${token}` },
                        body: {
                            "acompanhante": "ALTERADO",
                            "dataPartida": "2022-03-01",
                            "dataRetorno": "2022-03-10",
                            "localDeDestino": "Salvador",
                            "regiao": "Nordeste"
                        }
                    }).as('response')
            })
        })
            cy.get('@response').its('status').should('be.equal', 204)
        }) 
    })

    it('Excluir uma viagem', () => {
        cy.getTokenUser().then(token => {
            cy.request({
                url: '/v1/viagens',
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
                qs: {
                    acompanhante: "ALTERADO"
                }
            }).then(resp => {       
        cy.getTokenAdmin().then(token => {
            cy.request({
                url: `/v1/viagens/${resp.body.data[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            }).its('status').should('be.eq', 204)
        })
    }) 
        })
    })
})