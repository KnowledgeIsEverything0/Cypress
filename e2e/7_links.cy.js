describe("Feature 07 – Links / Create New Upload Link", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Creates a new upload link with name, expiration, file size, and unlimited uploads", () => {

    // Go to Quick Links page
    cy.visit("https://app.grabdocs.com/quick-links", {
      failOnStatusCode: false,
    });

    cy.location("pathname").should("include", "/quick-links");
    cy.wait(800); // allow UI to finish loading

    // ---- CLICK NEW LINK ----
    cy.contains("button", "New Link")
      .should("be.visible")
      .click({ force: true });

    cy.wait(500); // modal animation time

    // ---- LINK NAME ----
    const linkName = `Cypress Link ${Date.now()}`;

    cy.get('input[placeholder="Enter link name"]')
      .should("be.visible")
      .clear()
      .type(linkName);

    // ---- EXPIRATION DATE ----
    cy.contains("label", "Expiration Date")
      .parent()
      .find('input[type="datetime-local"]')
      .should("be.visible")
      .type("2025-11-22T07:00");

    // ---- MAX FILE SIZE (set to 10MB) ----
    cy.get('input[type="number"][max="10"][min="1"]')
      .first()
      .should("be.visible")
      .clear()
      .type("10");

    // ---- UNLIMITED UPLOADS (blank field) ----
    cy.get('input[placeholder="Unlimited"]')
      .should("be.visible")
      .clear();

    cy.wait(300);

    // ---- CLICK CREATE ----
    cy.contains("button", "Create Link")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    // ---- WAIT & VERIFY LINK IN LIST ----
    cy.contains(linkName, { timeout: 15000 })
      .should("be.visible");
    cy.wait(3000);
  });
});