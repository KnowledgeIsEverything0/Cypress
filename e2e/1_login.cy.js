describe('Feature 01 - Grabdoc Login', () => {
  it('Logs into Grabdocs', () => {

    const USERNAME = "deucewright692@gmail.com";
    const PASSWORD = "GrabYourDocs(.)(.)";
    const BYPASS_CODE = "335577"; // 2FA override

    // Go to Login page
    cy.visit('https://app.grabdocs.com/login', { failOnStatusCode: false });

    // Email Field
    cy.get("input#username[name='username']")
      .should("be.visible")
      .type(USERNAME);

    // Password Field
    cy.get('input#password[name="password"]')
      .should("be.visible")
      .type(PASSWORD, { log: false });

    // Sign In Button
    cy.get('button[type="submit"]')
      .contains(/^sign in$/i)
      .should("be.visible")
      .and("be.enabled")
      .click();

    // Wait for 2FA page to load
    cy.contains("Two-Factor Authentication", { timeout: 10000 })
      .should("be.visible");

    // Enter bypass 2FA code
    cy.get('input[placeholder="Enter 6-digit code"]')
      .should("be.visible")
      .clear()
      .type(BYPASS_CODE);

    // Click Verify Code
    cy.contains("button", /verify code/i)
      .should("be.enabled")
      .click();

    // Confirm login success (redirect to upload)
    cy.location("pathname", { timeout: 15000 })
      .should("include", "/upload");
    cy.wait(4000);
  });
});