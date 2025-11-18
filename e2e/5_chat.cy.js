describe("Feature 05 – Chat (main message input)", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Types a chat message and sends it", () => {
    // Make sure we're on the chat/upload page
    cy.location("pathname").should("include", "/upload");
    cy.wait(1000); // allow chat UI to fully load

    const msg = `What Document Type Is The One That Was Uploaded`;

    // 1) Type into chat message box
    cy.get('textarea[placeholder^="Ask anything or send a message"]')
      .should("be.visible")
      .type(msg, { delay: 10 });

    cy.wait(500); // allow UI to activate Send button

    // 2) Click Send
    cy.get('button[title="Send message"]')
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    // 3) Confirm message appears in thread
    cy.contains(msg, { timeout: 15000 })
      .should("be.visible");
    cy.wait(8000);
  });
});