describe("Feature 06 – Reach / Video Meeting: Create private meeting", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Creates a private meeting with a name, description, and workspace", () => {
    // Navigate directly to the Video Meeting screen
    cy.visit("https://app.grabdocs.com/video-meeting", {
      failOnStatusCode: false,
    });

    cy.location("pathname").should("include", "/video-meeting");
    cy.wait(1000); // allow video meeting UI to fully load

    // ---- OPEN CREATE MEETING MODAL ----
    cy.contains("button", "Create Meeting")
      .first()
      .should("be.visible")
      .click({ force: true });

    cy.wait(500); // let modal animate open

    // ---- MEETING NAME ----
    const meetingName = `Cypress Private Meeting ${Date.now()}`;

    cy.contains("label", "Meeting Name")
      .parent()
      .find('input[placeholder="Enter meeting name"]')
      .should("be.visible")
      .type(meetingName);

    // ---- OPTIONAL DESCRIPTION ----
    cy.contains("button", "Add Optional")
      .should("be.visible")
      .click({ force: true });

    cy.get('textarea[placeholder="Enter meeting description"]')
      .should("be.visible")
      .type("This is an automated meeting description created by Cypress.");

    // ---- WORKSPACE ----
    cy.contains("label", "Workspace")
      .parent()
      .find("select")
      .select("Personal Meeting");

    // ---- PRIVATE CHECKBOX ----
    cy.contains("label", "Private")
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(300);

    // ---- CLICK THE MODAL’S CREATE MEETING BUTTON ONLY ----
    cy.get(".fixed.inset-0") // isolate modal container
      .find("button")
      .contains("Create Meeting")
      .filter(":not([disabled])")
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });

    cy.wait(7000); // allow meeting to finish creation
  });
});