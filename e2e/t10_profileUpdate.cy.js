describe("Feature 10 - Profile Update", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Demonstrates what updating profile information would look like", () => {
    cy.visit("https://app.grabdocs.com/settings", { failOnStatusCode: false });
    cy.location("pathname").should("include", "/settings");

    cy.contains("button", "Profile")
      .should("be.visible")
      .click();

    // -------- Your REAL permanent info --------
    const originalData = {
      first: "Sean",
      last: "Wright",
      email: "deucewright692@gmail.com",
      phone: "+1 301 213 5581",
    };

    // -------- Dummy data for testing --------
    const testData = {
      first: "Cypress Test First",
      last: "Cypress Test Last",
      email: `cypress.test+${Date.now()}@example.com`,
      phone: "+1 999 999 9999",
    };

    // -------- Enter dummy test values --------
    cy.get("#firstName").clear().type(testData.first, { delay: 20 });
    cy.get("#lastName").clear().type(testData.last, { delay: 20 });
    cy.get("#email").clear().type(testData.email, { delay: 20 });
    cy.get("#phone_number").clear().type(testData.phone, { delay: 20 });

    // Click SAVE CHANGES
    cy.contains("button", "Save Changes")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.wait(2000);

    // Reload
    cy.reload();
  });
});