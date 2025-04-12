// cypress/e2e/tenants.cy.js
describe('Tenant Management', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name=email]').type('admin@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
        cy.visit('/tenants');
    });

    it('lists tenants and shows the page', () => {
        cy.contains('Tenants');
        cy.get('table').should('exist');
    });

    it('opens the add tenant form', () => {
        cy.contains('Add Tenant').click();
        cy.get('input[name=name]').should('exist');
        cy.get('button').contains('Create').should('exist');
    });

    it('creates a new tenant', () => {
        cy.contains('Add Tenant').click();
        cy.get('input[name=name]').type('Jane Doe');
        cy.get('input[name=email]').type('jane@example.com');
        cy.get('input[name=phone]').type('5551234567');
        cy.contains('Create').click();
        cy.contains('Tenant created');
    });
});
