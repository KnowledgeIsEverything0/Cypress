describe("Feature 15 – Feedback page from Account Menu", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("opens the Feedback page and submits feedback", () => {
    // Open the account/user menu (the SW avatar in the top-right)
    cy.contains("button", "SW")
      .should("be.visible")
      .click({ force: true });

    // Click the Feedback item in the dropdown
    cy.contains("a", "Feedback")
      .should("be.visible")
      .click({ force: true });

    // We should now be on /feedback
    cy.location("pathname").should("include", "/feedback");

    // Select a category
    cy.get("#category")
      .should("be.visible")
      .select("feature"); // value from <option value="feature">Feature Request</option>

    // Fill Title
    const titleText = `Cypress header feedback ${Date.now()}`;
    cy.get("#title")
      .should("be.visible")
      .clear()
      .type(titleText);

    // Fill Message
    const messageText =
      "This feedback was submitted automatically by a Cypress test.";
    cy.get("#message")
      .should("be.visible")
      .clear()
      .type(messageText);

    // Click Submit Feedback
    cy.contains("button", "Submit Feedback")
      .should("be.visible")
      .and("not.be.disabled")
      .click();;
    cy.wait(1500);
  });
});