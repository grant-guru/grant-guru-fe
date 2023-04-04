/// <reference types="cypress" />

describe("should navigate to scholarships page on form submit", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/user", {
      fixture: "user.json",
    });
    cy.get(".user-card-container").first().click();

    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/scholarships", { fixture: 'scholarships.json'});
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/favorites", { fixture: 'saved.json'});
    cy.get("button.form-submit").click();
    cy.location("pathname").should("eq", "/scholarships");
  });
  
  it("should have 8 scholarships", () => {
    cy.get('.Scholarship').should("have.length", 8)
    cy.get(".card-image").should("have.length", 8)
    cy.get(".scholarship-button").should("have.length", 8)
    cy.get(".scholarship-title").should("have.length", 8)
    cy.get(".scholarship-award").should("have.length", 8)
  })

  it("Should be able to save button and the button character changes", () => {
    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(1) > .scholarship-button').contains("Remove from Saved").click()
    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship")
  });

  it("Should be able to add to saved array", () => {
    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(2) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(3) > .scholarship-button').contains("Save this Scholarship").click()

    cy.get('.saves').click()
  });
})