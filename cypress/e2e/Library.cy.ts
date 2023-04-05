/// <reference types="cypress" />

describe("should navigate to scholarships page on form submit", () => {
  beforeEach(() => {
    cy.visit("https://grant-guru-fe.vercel.app/");
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/", {
      fixture: "user.json",
    });
    cy.get(".user-card-container").first().click();

    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/scholarships?location=AL&educationLevel=high-school&gender=true&ethnicity=Asian", { fixture: 'scholarships.json'});
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/favorites/", { fixture: 'saved.json'});
    
    cy.get("select#state-selector").select("AL");
    cy.get("select#education-level").select("High School");
    cy.get("select#gender-identity").select("True");
    cy.get("input[type=checkbox][name='Asian']").check().should("be.checked");

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