describe("Feature 02 – Upload", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Uploads a document from local disk", () => {
    // Make sure you're on the upload/chat screen
    cy.location("pathname").should("include", "/upload");

    // Put GrabdocsSamplePDF.pdf in cypress/fixtures
    cy.get('input[type="file"]').first().selectFile("cypress/fixtures/GrabdocsSamplePDF.pdf", {
      force: true,
    });
    cy.wait(7500);
  });
});