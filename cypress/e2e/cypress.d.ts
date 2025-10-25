/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        dragTo(targetSelector: string): Chainable<Element>
        reorderConstructorItem(targetSelector: string): Chainable<Element>
    }
}