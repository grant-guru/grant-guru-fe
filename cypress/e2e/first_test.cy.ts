describe("Login view", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:3000/");
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
      cy.get("img").should("have.attr", "src", "https://media.licdn.com/dms/image/C5603AQHvilQI3AUEMQ/profile-displayphoto-shrink_800_800/0/1609862815851?e=1685577600&v=beta&t=HMl5xDZTacnO-E1fQSgfzhgzCJKMBc3x-pj5LaSZA-M");
      cy.get("h2").contains("Adam Hughes");
    });
  });

  it("navigates to the form view after selecting a user card", () => {
    cy.intercept("GET", "https://college-fund-mock-data-api.herokuapp.com/user", {
      fixture: "user.json",
    });

    cy.get(".user-cards-container").first().click();
    cy.location("pathname").should("eq", "/form");
  });
});

