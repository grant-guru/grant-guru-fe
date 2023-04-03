/// <reference types="cypress" />

context("Form Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(".user-card-container").first().click();
  });

  it("should render the form with all inputs and buttons", () => {
    cy.get(".user-form").within(() => {
      cy.get("select#state-selector").should("exist");
      cy.get("select#education-level").should("exist");
      cy.get("select#gender-identity").should("exist");
      cy.get("input[type=checkbox]").should("have.length", 7);
      cy.get("input[type=radio][name=veteranStatus]").should("have.length", 2);
      cy.get("input[type=radio][name=immigrantStatus]").should("have.length", 2);
      cy.get("button.form-submit").should("exist");
    });
  });

  it("should allow selecting options from dropdowns", () => {
    cy.get("select#state-selector").select("AL");
    cy.get("select#education-level").select("High School");
    cy.get("select#gender-identity").select("True");
  });

  it("should allow selecting ethnicity checkboxes", () => {
    cy.get(".ethnicity-form").within(() => {
      cy.get("input[type=checkbox][name='White']").check().should("be.checked");
      cy.get("input[type=checkbox][name='Asian']").check().should("be.checked");
      cy.get("input[type=checkbox][name='White']").uncheck().should("not.be.checked");
    });
  });

  it("should allow selecting military and immigrant status radio buttons", () => {
    cy.get(".military-form").within(() => {
      cy.get("input[type=radio][name='veteranStatus'][value='true']").check().should("be.checked");
    });
    cy.get(".residency-form").within(() => {
      cy.get("input[type=radio][name='immigrantStatus'][value='true']").check().should("be.checked");
    });
  });

  it("should navigate to scholarships page on form submit", () => {
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/scholarships", { fixture: 'scholarships.json'});

    cy.get("button.form-submit").click();
    cy.location("pathname").should("eq", "/scholarships");
  });
});
