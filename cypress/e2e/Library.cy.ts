/// <reference types="cypress" />

describe("should navigate to scholarships page on form submit", () => {
  beforeEach(() => {
    cy.visit("https://grant-guru-fe.vercel.app/");
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/", {
      fixture: "user.json",
    });
    cy.get(".user-card-container").first().click();

    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/scholarships?state=AL&education=high-school&lgbt=True&ethnicity=Asian", { fixture: 'scholarships.json'});
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
    cy.intercept('POST', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/scholarships/1', {
      statusCode: 201,
      body: { message: 'Scholarship added to favorites' },
    }).as('postRequest');

    cy.intercept('DELETE', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/favorites/', {
      statusCode: 200,
      body: { message: 'Scholarship removed from favorites' },
    }).as('deleteRequest');

    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(1) > .scholarship-button').contains("Remove from Saved").click()
    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship")
  });

  it("Should be able to add to saved array", () => {

    cy.intercept('POST', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/scholarships/1', {
      statusCode: 201,
      body: { message: 'Scholarship added to favorites' },
    }).as('postRequest');

    cy.intercept('POST', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/scholarships/2', {
      statusCode: 201,
      body: { message: 'Scholarship added to favorites' },
    }).as('postRequest');

    cy.intercept('POST', 'https://grant-guru-be.herokuapp.com/api/v1/users/1/scholarships/3', {
      statusCode: 201,
      body: { message: 'Scholarship added to favorites' },
    }).as('postRequest');

    cy.get(':nth-child(1) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(2) > .scholarship-button').contains("Save this Scholarship").click()
    cy.get(':nth-child(3) > .scholarship-button').contains("Save this Scholarship").click()

    cy.get('.saved').click()
  });
})