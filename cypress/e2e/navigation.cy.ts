describe("navigation tests", () => {
  it("tests opening and closing mobile menu", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-id="open-mobile-menu"]').should("not.be.exist");
    cy.get('[data-id="open-mobile-menu"]').should("be.visible");
    cy.get('[data-id="open-mobile-menu-btn"]').click();
    cy.get('[data-id="open-mobile-menu"]').should("not.be.exist");
  });
  it("tests navigation menu", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-id="home-link"]').click();
    cy.get('[data-id="friends-link"]').click();
    cy.get('[data-id="groups-link"]').click();
    cy.get('[data-id="stories-link"]').click();
    cy.get('[data-id="login-link"]').click();
  });
});
