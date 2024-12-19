describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/login");
    cy.wait(1000);
  });
});
