Cypress.Commands.add("loginGrabDocs", () => {
  const USERNAME = "deucewright692@gmail.com";
  const PASSWORD = "GrabYourDocs(.)(.)";
  const BYPASS_CODE = "335577"; // ← 2FA override code

  cy.visit("https://app.grabdocs.com/login", { failOnStatusCode: false });

  // Enter username
  cy.get('input#username[name="username"]')
    .should("be.visible")
    .type(USERNAME);

  // Enter password
  cy.get('input#password[name="password"]')
    .should("be.visible")
    .type(PASSWORD, { log: false });

  // Click Sign In
  cy.contains('button', /sign in/i).click();

  // Wait for the 2FA box to load
  cy.contains("Two-Factor Authentication", { timeout: 10000 })
    .should("be.visible");

  // Type bypass code
  cy.get('input[placeholder="Enter 6-digit code"]')
    .should("be.visible")
    .clear()
    .type(BYPASS_CODE);

  // Verify code
  cy.contains("button", /verify code/i)
    .should("be.enabled")
    .click();

  // Wait for redirect
  cy.location("pathname", { timeout: 15000 })
    .should("include", "/upload");
});