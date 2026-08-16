describe("Healthcare Records Management System", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("loads the application", () => {
    cy.get("body").should("be.visible");
  });

  it("displays Team Informatics heading", () => {
    cy.contains("Team Informatics").should("be.visible");
  });

  it("shows the Sign in section", () => {
    cy.contains("Sign in").should("be.visible");
  });

  it("shows the Register staff section", () => {
    cy.contains("Register staff").should("be.visible");
  });

});