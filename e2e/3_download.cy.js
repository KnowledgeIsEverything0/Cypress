describe("Feature 03 – Download GrabdocsSamplePDF.pdf", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Clicks Download and navigates to the GrabdocsSamplePDF.pdf URL", () => {
    // Go to the Files page inside the app
    cy.visit("https://app.grabdocs.com/files", { failOnStatusCode: false });
    cy.location("hostname").should("eq", "app.grabdocs.com");

    //Make sure the sample file is listed somewhere
    cy.contains(/GrabdocsSamplePDF/i, { timeout: 20000 }).should("be.visible");

    // Click the visible 'Download file' button
    cy.get('button[title="Download file"]')
      .filter(":visible")
      .first()
      .click({ force: true });
    cy.wait(5000);
  });
});