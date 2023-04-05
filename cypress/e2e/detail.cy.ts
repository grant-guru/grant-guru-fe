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
    cy.get('.Library > :nth-child(2)').click()
    cy.location('pathname').should('eq', '/scholarship/5')
  });

  it("should display scholarship detail", () => {
    cy.get('.scholarshipDetail').contains("Johnson-Baldwin Grant");
    cy.get('h2').contains('$971');
    cy.get('h4').contains('label', 'Deadline for submission:')
  })

})
