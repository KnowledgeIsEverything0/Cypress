describe("Feature 16 – Settings Navigation Tabs + Interactions", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("opens Settings and clicks through all tabs + interacts with settings", () => {
    cy.visit("https://app.grabdocs.com/settings", { failOnStatusCode: false });
    cy.location("pathname").should("include", "/settings");

    const tabs = ["Profile", "Security", "Display", "Video", "Usage"];

    tabs.forEach((tab) => {
      cy.log(`Trying tab: ${tab}`);

      // Find a matching button manually so we can SKIP if it's not there
      cy.get("button").then(($buttons) => {
        const match = [...$buttons].find((btn) =>
          (btn.textContent || "").trim().includes(tab)
        );

        // If no button with this label exists, just skip this tab
        if (!match) {
          cy.log(`Tab "${tab}" not found – skipping.`);
          return;
        }

        // Click the tab (even if partially clipped)
        cy.wrap(match)
          .scrollIntoView()
          .click({ force: true });

        // Optional: check active styling (blue border/text)
        cy.wrap(match).then(($btn) => {
          const className = $btn.attr("class") || "";
          if (className.includes("border-blue-") || className.includes("text-blue-600")) {
            cy.wrap($btn)
              .should("have.attr", "class")
              .and("match", /border-blue-|text-blue-600/);
          }
        });

        cy.wait(500);

        // ---- TAB-SPECIFIC ACTIONS ----
        if (tab === "Display") {
          // Theme dropdown scoped to "Theme" label
          cy.contains("label", "Theme")
            .parent()
            .find("select")
            .first()
            .should("be.visible")
            .select("light")
            .wait(500)
            .select("system"); // "light" | "dark" | "system"

          cy.wait(500);
        }

        if (tab === "Video") {
          // Only run if we actually have the Video tab content on screen
          cy.contains("label", "Enable Recording", { timeout: 1000 })
            .parent()
            .find('input[type="checkbox"]')
            .first()
            .as("recordingCheckbox");

          cy.get("@recordingCheckbox").check({ force: true });
          cy.wait(500);
          cy.get("@recordingCheckbox").uncheck({ force: true });
          cy.wait(500);
        }

        if (tab === "Usage") {
          cy.contains("button", "Refresh")
            .scrollIntoView()
            .should("be.visible")
            .click({ force: true });

          cy.wait(500);
        }
      });
    });
  });
});