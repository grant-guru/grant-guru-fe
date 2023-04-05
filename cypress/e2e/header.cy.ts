describe('Header component', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://grant-guru-be.herokuapp.com/api/v1/users/1/", {
      fixture: "user.json",
    });

    cy.visit('https://grant-guru-fe.vercel.app/')
    cy.get(".user-card-container").first().click();
  });

  it('should display the user image and first name', () => {
    cy.fixture('user.json').then((user) => {
      cy.get('img')
        .should('have.attr', 'src', user.data.attributes.image_url);

      cy.get('a > h2')
        .contains(`Welcome ${user.data.attributes.first_name}!`);
    });
  });

  it('should have the correct navigation links', () => {
    cy.get('.header nav')
      .find('a')
      .should('have.length', 4)
      .and((links) => {
        expect(links.eq(0)).to.have.text('Form');
        expect(links.eq(1)).to.have.text('Saved');
        expect(links.eq(2)).to.have.text('Scholarships');
        expect(links.eq(3)).to.have.text('LogOut');
      });
  });
});
