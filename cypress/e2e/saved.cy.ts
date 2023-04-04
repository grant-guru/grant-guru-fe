/// <reference types="cypress" />
describe('Library and Saved components', () => {
  beforeEach(() => {
    cy.intercept('GET','https://college-fund-mock-data-api.herokuapp.com/favorites', {
      fixture: 'saved.json',
    }).as('getScholarships');
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/user", {
      fixture: "user.json",
    });
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/scholarships", { fixture: 'scholarships.json'});

    cy.visit('http://localhost:3000/')
    cy.get(".user-card-container").first().click();
    cy.get("button.form-submit").click();
    cy.get(".saves").click();
  });

  it('should display scholarship cards', () => {
    cy.wait('@getScholarships');
    cy.get('.Saved').should('have.length', 3);
  });

  it('should be able to remove a scholarship', () => {
    cy.wait('@getScholarships');
    cy.get('.Library').children().first().find('button').click();
    cy.get('.Saved').should('have.length', 2); 
  });
});