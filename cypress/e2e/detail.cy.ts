/// <reference types="cypress" />

describe("should navigate to scholarships page on form submit", () => {
  beforeEach(() => {
    cy.visit("https://grant-guru-fe.vercel.app/");
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/", {
      fixture: "user.json",
    });
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/scholarships/5", { fixture: 'scholarships.json'});
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/favorites", { fixture: 'saved.json'});
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/scholarships", { fixture: 'scholarships.json'});
    cy.get(".user-card-container").first().click();
    cy.get("button.form-submit").click();

    cy.location("pathname").should("eq", "/scholarships");
    cy.get('.Library > :nth-child(2)').click()
    cy.location('pathname').should('eq', '/scholarship/2')
  });

  it("should display scholarship detail", () => {
    cy.get('.scholarshipDetail').contains("RailsConf 23");
    cy.get('h2').contains('$1234');
    cy.get('h4').contains('label', 'Deadline for submission:')
  })

  it("Should be able to save button and the button character changes", () => {
    cy.intercept('POST', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/scholarship/2', {
      statusCode: 201,
      body: { message: 'Scholarship added to favorites' },
    }).as('postRequest');
    cy.intercept('DELETE', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/favorites/2', {
      statusCode: 200,
      body: { message: 'Scholarship removed from favorites' },
    }).as('deleteRequest');
    
    cy.get('.scholarship-button').contains("Save this Scholarship").click()
    cy.get('.scholarship-button').contains("Remove from Saved").click()
    cy.get('.scholarship-button').contains("Save this Scholarship")
  })

  it("Should be able to add to saved array", () => {
    cy.get('.saved').click()
    cy.get('.Library > :nth-child(1)').should('be.visible')
  });
})
