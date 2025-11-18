describe("Feature 13 – Chat / Chat History", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Opens Chat History and loads a past conversation", () => {
    // Open Chat History sidebar (clock button)
    cy.get('button[title="Show History"]')
      .should("be.visible")
      .click({ force: true });

    // Wait for panel
    cy.contains("h3", "Chat History", { timeout: 8000 })
      .should("be.visible");

    // Ensure at least one conversation exists
    cy.get(".space-y-2 .p-3.rounded-md.cursor-pointer.border")
      .should("have.length.greaterThan", 0);

    // Click the first conversation
    cy.get(".space-y-2 .p-3.rounded-md.cursor-pointer.border")
      .first()
      .click({ force: true });

    cy.wait(1500);

    // Close the Chat History sidebar
    cy.get('button[title="Hide History"]')
      .should("be.visible")
      .click({ force: true });
  });
});