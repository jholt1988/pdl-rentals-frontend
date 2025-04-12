// cypress/e2e/login.cy.js
describe('Login Flow', () => {
    it('logs in successfully with valid credentials', () => {
        cy.visit('/login');

        cy.get('input[name=email]').type('admin@example.com');
        cy.get('input[name=password]').type('password123');
        cy.get('button[type=submit]').click();

        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard');
    });

    it('shows error with invalid credentials', () => {
        cy.visit('/login');

        cy.get('input[name=email]').type('wrong@example.com');
        cy.get('input[name=password]').type('wrongpass');
        cy.get('button[type=submit]').click();

        cy.contains('Failed');
    });
});
