describe("Feature 14 – Logout", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Logs the user out from the user menu", () => {
    // Click SW avatar (blue circle)
    cy.get('button.flex.items-center.justify-center.h-10.w-10.rounded-full.bg-blue-600.text-white')
      .should("be.visible")
      .click({ force: true });

    // Click "Sign out"
    cy.contains("button", /^Sign out$/i)
      .should("be.visible")
      .wait(2000)
      .click({ force: true });
    cy.wait(2000);

    // Confirm return to login page
    cy.contains(/sign in|login/i, { timeout: 8000 }).should("be.visible");
  });
});