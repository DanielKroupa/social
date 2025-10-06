describe("navigation tests", () => {
  it("tests opening and closing mobile menu", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-id="open-mobile-menu"]').should("not.be.exist");
    cy.get('[data-id="open-mobile-menu"]').should("be.visible");
    cy.get("[open-mobile-menu-btn]").click();
    cy.get('[data-id="open-mobile-menu"]').should("not.be.exist");
  });
  it("tests navigation menu", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-id="open-mobile-menu"]').should("not.be.exist");
  });
});
