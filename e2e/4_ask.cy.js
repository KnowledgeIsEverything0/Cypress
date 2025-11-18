describe("Feature 04 – Ask / Feedback form", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Opens the Ask button, fills the feedback form, and submits it", () => {
    // Make sure we're on the main app screen
    cy.location("pathname").should("include", "/upload");

    // Small wait for the main UI to fully settle
    cy.wait(500);

    // 1) Click the floating Ask button (bottom-left)
    cy.contains("span", "Ask", { matchCase: false })
      .should("be.visible")
      .closest("button")
      .click();

    // Give the Ask/feedback panel time to slide in
    cy.wait(700);

    // 2) Intercept the feedback API call
    cy.intercept("POST", "**/feedback**").as("sendFeedback");

    // 3) Select a category from the dropdown
    cy.get("select")
      .first()
      .should("be.visible")
      .select("feature"); // value="feature"

    cy.wait(400);

    // 4) Fill the Title input
    const titleText = `Cypress feedback title ${Date.now()}`;
    cy.contains("label", /^Title$/)
      .parent()
      .find('input[type="text"]')
      .should("be.visible")
      .clear()
      .type(titleText);

    cy.wait(300);

    // 5) Fill the Message textarea
    const messageText =
      "This is an automated feedback message from Cypress.";
    cy.contains("label", /^Message$/)
      .parent()
      .find("textarea")
      .should("be.visible")
      .clear()
      .type(messageText);

    cy.wait(300);

    // 6) Click Submit Feedback
    cy.contains("button", /^Submit Feedback$/)
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // 7) Make sure the feedback request was actually sent
    cy.wait("@sendFeedback", { timeout: 15000 }).then((interception) => {
      cy.log("Feedback API status:", interception.response?.statusCode);
      expect(interception.response?.statusCode).to.be.a("number");
    });

    // 8) Assert the error toast appears with the exact message
    cy.contains("div", "Failed to submit feedback. Please try again.", {
      timeout: 10000,
    }).should("be.visible");
  });
});
