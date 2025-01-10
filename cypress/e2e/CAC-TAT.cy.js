describe('template spec', () => {
  it('abrir a aplicação', () => {
    cy.visit('http://127.0.0.1:5500/src/index.html')
  })
})

describe('Central de atendimento TAT', () => {
  it('verficar o titulo da aplicaco', () =>{
    cy.visit('http://127.0.0.1:5500/src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})