describe("Feature 12 – Workspaces / Create & Open Workspace Tools", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Opens Workspaces page and interacts with workspace tools", () => {
    cy.visit("https://app.grabdocs.com/workspaces", { failOnStatusCode: false });

    // Make sure page loaded
    cy.location("pathname").should("include", "/workspaces");

    // CLICK MAIN WORKSPACE TOOL BUTTONS

    // Start Meeting
    cy.get('button[title="Start Meeting"]').click({ force: true });

    cy.wait(800);
    cy.visit("https://app.grabdocs.com/workspaces");

    // Start Chat
    cy.get('button[title="Start Chat"]').click({ force: true });

    cy.wait(800);
    cy.visit("https://app.grabdocs.com/workspaces");

    // View Members
    cy.get('button[title="View Members"]').click({ force: true });

    cy.wait(800);
    cy.visit("https://app.grabdocs.com/workspaces");

    // Shared Files
    cy.get('button[title="Shared Files"]').click({ force: true });

    cy.wait(800);
    cy.visit("https://app.grabdocs.com/workspaces");

    // CREATE A NEW WORKSPACE

    cy.contains("button", "Create Workspace")
      .should("be.visible")
      .click({ force: true });   // <— overlay-safe click

    // Workspace name
    cy.get('input[placeholder="Enter workspace name"]')
      .should("be.visible")
      .type("Automation Workspace");

    // Description
    cy.get('textarea[placeholder="Enter workspace description"]')
      .type("Workspace created by Cypress automation.");

    // Click Create
    cy.contains("button", /^Create$/)
      .should("be.visible")
      .click({ force: true });   //

    cy.wait(1500);

    // Return to workspaces list (just to finish test cleanly)
    cy.visit("https://app.grabdocs.com/workspaces", { failOnStatusCode: false });
  });
});