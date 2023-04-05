/// <reference types="cypress" />
describe('Library and Saved components', () => {
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

    cy.get(".saves").click();
  });

  it('should display scholarship cards', () => {
    cy.get('.Saved').should('have.length', 3);
  });

  it('should be able to remove a scholarship', () => {
    cy.get('.Library').children().first().find('button').click();
    cy.get('.Saved').should('have.length', 2); 
  });

  it('should display info for the scholarship', () => {
    cy.get(".Library").first().within(() => {
      cy.get("img").should("have.attr", "src", "https://media.istockphoto.com/id/1333580948/photo/piggy-bank-with-graduation-cap-on-black-glass-floor-money-saving-concept.jpg?s=612x612&w=0&k=20&c=Vp1CnOigey0sK1RJi11v5F8GY5_kJnCG_SLNeiQ6x0A=");
      cy.get("h2").contains("Hire us plz");
      cy.get("p").contains("Award Amount: $1,234")
    });
  })
});