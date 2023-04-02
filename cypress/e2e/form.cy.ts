/// <reference types="cypress" />

describe('Form view', () => {
    beforeEach(() => {
      // Visit the app before each test
      cy.visit('http://localhost:3000/form');
    });
  
    it('should display the header', () => {
      cy.get('.header').should('be.visible');
      cy.get('.header h1').contains('Welcome User!');
      cy.get('.header nav a').should('have.length', 3);
    });
  
    it('should display the form', () => {
      cy.get('.user-form').should('be.visible');
      cy.get('.input-container').should('be.visible');
      cy.get('#state-selector').should('be.visible');
      cy.get('#education-level').should('be.visible');
      cy.get('#gender-identity').should('be.visible');
      cy.get('.ethnicity-form').should('be.visible');
      cy.get('.military-form').should('be.visible');
      cy.get('.residency-form').should('be.visible');
      cy.get('.form-submit').should('be.visible');
    });
  
    it('should fill out and submit the form', () => {
      // Fill out the form
      cy.get('#state-selector').select('NY');
      cy.get('#education-level').select('Undergraduate');
      cy.get('#gender-identity').select('True');
      cy.get('input[name="White"]').check();
      cy.get('input[name="veteranTrue"]').check();
      cy.get('input[name="immigrantTrue"]').check();
  
      // Submit the form
      cy.get('.form-submit').click();
  
      // Check if the URL has changed to /scholarships
      cy.url().should('include', '/scholarships');
    });
  });
  