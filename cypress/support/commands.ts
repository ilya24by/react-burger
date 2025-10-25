/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom drag and drop command for React DnD
Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetSelector) => {
    const dataTransfer = new DataTransfer();

    return cy.wrap(subject)
        .trigger('dragstart', { dataTransfer })
        .get(targetSelector)
        .trigger('dragenter', { dataTransfer })
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer });
});

// Custom command for reordering constructor items
Cypress.Commands.add('reorderConstructorItem', { prevSubject: 'element' }, (subject, targetSelector) => {
    const dataTransfer = new DataTransfer();

    return cy.wrap(subject)
        .trigger('dragstart', { dataTransfer })
        .get(targetSelector)
        .trigger('dragenter', { dataTransfer })
        .trigger('dragover', { dataTransfer })
        .trigger('drop', { dataTransfer });
});

declare global {
    namespace Cypress {
        interface Chainable {
            dragTo(targetSelector: string): Chainable<Element>
            reorderConstructorItem(targetSelector: string): Chainable<Element>
        }
    }
}