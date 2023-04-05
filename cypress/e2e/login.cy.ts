/// <reference types="cypress" />


describe("Login view", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("https://grant-guru-fe.vercel.app/");
  });

  it("displays the login container", () => {
    cy.get(".login-container").should("exist");
  });

  it("displays the correct header", () => {
    cy.get(".login-container h1").contains("Choose Your Profile");
  });

  it("displays user cards", () => {
    cy.get(".user-cards-container .user-card-container").should("have.length", 8);
  });

  it("displays correct user card data", () => {
    cy.get(".user-cards-container .user-card-container").first().within(() => {
      cy.get("img").should("have.attr", "src", "https://media.licdn.com/dms/image/D5635AQHEnwpJLXt26Q/profile-framedphoto-shrink_800_800/0/1678064386468?e=1680879600&v=beta&t=p8ZKUqplSskK5g-2phNbRo1UgXLdLMAZ0X_lmdowZfs");
      cy.get("h2").contains("Drew Layton");
    });
  });

  it("navigates to the form view after selecting a user card", () => {
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/", {
      fixture: "user.json",
    });

    cy.get(".user-card-container").first().click();
    cy.location("pathname").should("eq", "/form");
  });
});

