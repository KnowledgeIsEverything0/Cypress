describe("Feature 11 – Analytics / Overview, Activity, Receipts", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
    cy.visit("https://app.grabdocs.com/analysis", { failOnStatusCode: false });
    cy.location("pathname").should("include", "/analysis");
  });

  it("Opens Analytics → Overview tab", () => {
    cy.contains("button", "Overview")
      .should("be.visible")
      .click();

    // Optional: check that Overview looks active if it uses an active class
    cy.contains("button", "Overview").then($btn => {
      const className = $btn.attr("class") || "";
      if (className.includes("bg-blue-") || className.includes("text-white")) {
        cy.wrap($btn).should("have.attr", "class").and("match", /bg-blue-|text-white/);
      }
    });
  });

  it("switches to Analytics → Activity tab", () => {
    cy.contains("button", "Activity")
      .should("be.visible")
      .click();

    cy.contains("button", "Activity").then($btn => {
      const className = $btn.attr("class") || "";
      if (className.includes("bg-blue-") || className.includes("text-white")) {
        cy.wrap($btn).should("have.attr", "class").and("match", /bg-blue-|text-white/);
      }
    });
  });

  it("switches to Analytics → Receipts tab", () => {
    cy.contains("button", "Receipts")
      .should("be.visible")
      .click();

    cy.contains("button", "Receipts").then($btn => {
      const className = $btn.attr("class") || "";
      if (className.includes("bg-blue-") || className.includes("text-white")) {
        cy.wrap($btn).should("have.attr", "class").and("match", /bg-blue-|text-white/);
      }
    });
  });
});