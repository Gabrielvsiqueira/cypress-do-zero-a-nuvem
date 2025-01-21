Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[name="firstName"]').type('Gabriel Vitor', {delay: 100})
    cy.get('input[name="lastName"]').type('Siqueira', {delay: 100})
    cy.get('input[name="phone"]').eq(0).should('have.value', '').type(999570539, {delay: 100})
    cy.get('input[name="email"]').eq(0).type('gabesiqueira25@gmail.com', {delay: 100})
    cy.get('textarea[name="open-text-area"]').type('Teste.', {delay: 100})
    cy.get('button[type="submit"]').click()
}) 

