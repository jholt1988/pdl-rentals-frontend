// cypress/e2e/leases.cy.js
describe('Lease Management', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name=email]').type('admin@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
        cy.visit('/leases');
    });

    it('loads leases page and displays data', () => {
        cy.contains('Leases');
        cy.get('table').should('exist');
    });

    it('opens the add lease form', () => {
        cy.contains('Add Lease').click();
        cy.get('input[name=rentAmount]').should('exist');
        cy.get('button').contains('Create').should('exist');
    });

    it('creates a new lease', () => {
        cy.contains('Add Lease').click();
        cy.get('input[name=rentAmount]').type('1500');
        cy.get('input[name=startDate]').type('2024-01-01');
        cy.get('input[name=endDate]').type('2024-12-31');
        cy.get('input[name=propertyId]').type('1');
        cy.get('input[name=tenantId]').type('1');
        cy.contains('Create').click();
        cy.contains('Lease created');
    });
});
