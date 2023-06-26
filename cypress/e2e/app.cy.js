describe('Navigation', () => {
    it('should navigate to the chatgpt ai page', () => {
        // Start from the index page
        cy.visit('http://localhost:4500/');

        // Find a link with an href attribute containing "/chatgpt/ai" and click it
        cy.get('a[href*="/chatgpt/ai"]').click();

        // The new url should include "/chatgpt/ai"
        cy.url().should('include', '/chatgpt/ai');

        // The new page should contain an h1 with "AI模擬"
        cy.get('h1').contains('AI模擬');
    });
});