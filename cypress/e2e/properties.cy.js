// cypress/e2e/properties.cy.js
describe('Property Management', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name=email]').type('admin@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
        cy.visit('/properties');
    });

    it('lists properties and navigates correctly', () => {
        cy.contains('Properties');
        cy.get('table').should('exist');
    });

    it('opens the add property form', () => {
        cy.contains('Add Property').click();
        cy.get('input[name=name]').should('exist');
        cy.get('button').contains('Create').should('exist');
    });

    it('creates a new property', () => {
        cy.contains('Add Property').click();
        cy.get('input[name=name]').type('Test Property');
        cy.get('input[name=address]').type('123 Cypress Way');
        cy.get('input[name=type]').type('Residential');
        cy.get('input[name=unitCount]').type('5');
        cy.contains('Create').click();
        cy.contains('Property created');
    });
});
