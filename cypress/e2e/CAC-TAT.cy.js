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

describe ('Copular os dados de formulário da página', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/src/index.html')
  cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('Ex 1 - Preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('input[name="firstName"]')
        .as('nome')
        .should('be.visible')
        .type('Gabriel Vitor')
      cy.get('@nome')
        .should('have.value', 'Gabriel Vitor')

      cy.get('input[name="lastName"]')
        .as('sobrenome')
        .should('be.visible')
        .type('Siqueira')
      cy.get('@sobrenome')
        .should('have.value', 'Siqueira') 

      cy.get('input[name="email"]')
        .as('email')
        .eq(0)
        .should('have.value', '')
        .type('gabesiqueira25@gmail.com')
      cy.get('@email')
        .should('have.value', 'gabesiqueira25@gmail.com') 

      cy.get('input[name="phone"]')
        .as('telefone')
        .eq(0)
        .should('have.value', '')
        .type(999570539)
      cy.get('@telefone')
        .should('have.value', 999570539) 

      cy.get('textarea[name="open-text-area"]')
        .as('feedback')
        .should('be.visible')
        .type('Teste inserindo elemento dentro do bloco de como podemos ajudar.', {delay: 50})

      cy.get('button[type="submit"]') 
        .as('enviar')
        .should('be.visible')
        .click()
  })
  it('Ex 2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[name="firstName"]').should('be.visible').type('Gabriel Vitor')
    cy.get('input[name="lastName"]').should('be.visible').type('Siqueira')
    cy.get('input[name="email"]').eq(0).should('have.value', '').type('teste')
    cy.get('input[name="phone"]').eq(0).should('have.value', '').type(999570539)
    cy.get('textarea[name="open-text-area"]').should('be.visible').type('Teste.')
    cy.get('button[type="submit"]') .should('be.visible').click()
     cy.get('.error').should('be.visible')
  })
  it('Ex 3 - Verificar tipo do campo telefone', () => {
    cy.get('input[name="phone"]').eq(0).should('have.value', '').type('abc')
  })
  it('Ex 4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('input[name="firstName"]').type('Gabriel Vitor')
    cy.get('input[name="lastName"]').type('Siqueira')
    cy.get('input[name="email"]').eq(0).type('gabesiqueira25@gmail.com')
    cy.get('textarea[name="open-text-area"]').type('Teste.', {delay: 100})
    cy.get('button[type="submit"]').click()
    cy.get('input[name="phone"]').eq(0).should('have.value', '').type(999570539)
    cy.get('.error').should('be.visible')
  })
  it('Ex 5 - Preenche e limpa os campos nome, sobrenome, email e telefone',() => {
    cy.get('input[name="firstName"]').type('Gabriel Vitor', {delay:100}).should('have.value', 'Gabriel Vitor').clear()
    cy.get('input[name="lastName"]').type('Siqueira', {delay:100}).should('have.value', 'Siqueira').clear()
    cy.get('input[name="email"]').eq(0).type('teste@gmail.com', {delay:100}).should('have.value', 'teste@gmail.com').clear()
    cy.get('input[name="phone"]').eq(0).type(999570539, {delay:100}).should('have.value', 999570539).clear()
  })
  it('Ex 6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('Ex 7 - Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('Ex 8 - Identificar elemento com a funcionalidade contains()', () => {
    cy.contains('button', 'Enviar')
  })
})