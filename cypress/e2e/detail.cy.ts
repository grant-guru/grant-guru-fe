describe("should navigate to scholarships page on form submit", () => {
  beforeEach(() => {
    cy.visit("https://grant-guru-fe.vercel.app/");
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

  it("Should be able to save button and the button character changes", () => {
    cy.get('.scholarship-button').contains("Save this Scholarship").click()
    cy.get('.scholarship-button').contains("Remove from Saved").click()
    cy.get('.scholarship-button').contains("Save this Scholarship").click()
  })

  it("Should be able to add to saved array", () => {
    cy.get('.saved').click()
    cy.get('.Library > :nth-child(4)').should('be.visible')
  });
})
