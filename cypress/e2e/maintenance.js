// cypress/e2e/maintenance.cy.js
describe('Maintenance Management', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name=email]').type('admin@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
        cy.visit('/maintenance');
    });

    it('displays maintenance requests list', () => {
        cy.contains('Maintenance');
        cy.get('table').should('exist');
    });

    it('opens add maintenance form', () => {
        cy.contains('Add Request').click();
        cy.get('input[name=title]').should('exist');
        cy.contains('Create').should('exist');
    });

    it('submits a new request', () => {
        cy.contains('Add Request').click();
        cy.get('input[name=title]').type('Clogged drain');
        cy.get('textarea[name=description]').type('Drain is blocked in bathroom');
        cy.get('select[name=priority]').select('Medium');
        cy.get('input[name=propertyName]').type('Unit B');
        cy.contains('Create').click();
        cy.contains('Maintenance request created');
    });
});
