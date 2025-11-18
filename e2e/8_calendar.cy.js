describe("Feature 08 – Calendar Features", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("Creates a calendar event using the /calendar/create page", () => {
    cy.visit("https://app.grabdocs.com/calendar/create", {
      failOnStatusCode: false,
    });

    cy.location("pathname").should("include", "/calendar/create");

    const eventTitle = `Cypress Calendar Event ${Date.now()}`;

    // TITLE
    cy.get('input[placeholder="Team Meeting, Client Call, etc."]')
      .should("be.visible")
      .type(eventTitle);

    // DESCRIPTION
    cy.get('textarea[placeholder="Add details about the event..."]')
      .should("be.visible")
      .type("Automated Cypress event description.");

    // LOCATION
    cy.get('input[placeholder="Conference Room A"]')
      .should("be.visible")
      .type("Conference Room B");

    // MEETING URL
    cy.get('input[type="url"][placeholder^="https://grabdocs.com"]')
      .should("be.visible")
      .type("https://grabdocs.com/join-meeting?meeting_id=999");

    // PARTICIPANT EMAIL
    cy.get('input[type="email"][placeholder="email@example.com"]')
      .should("be.visible")
      .type("testuser@example.com");

    // PARTICIPANT NAME
    cy.get('input[placeholder="Name (optional)"]')
      .should("be.visible")
      .type("Test User");

    // REMINDER
    cy.contains("button", "15 min before")
      .should("be.visible")
      .click();

    // RECURRING TOGGLE
    cy.get(".peer")
      .first()
      .click({ force: true });

    // Click The Create Event Button
    cy.contains("button", /^Create Event$/)
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    // Validate redirect
    cy.location("pathname", { timeout: 10000 })
      .should("include", "/calendar");

    // Validate event exists on calendar
    cy.contains(eventTitle, { timeout: 15000 })
      .should("exist");
  });
it("creates a temporary event and then deletes it from the All Events view", () => {
    const eventTitle = `Cypress Temp Event ${Date.now()}`;

    // 1) Create a temporary event on /calendar/create
    cy.visit("https://app.grabdocs.com/calendar/create", {
      failOnStatusCode: false,
    });

    cy.location("pathname").should("include", "/calendar/create");

    cy.get('input[placeholder="Team Meeting, Client Call, etc."]')
      .should("be.visible")
      .type(eventTitle);

    cy.get('textarea[placeholder="Add details about the event..."]')
      .type("Temporary event created by Cypress for delete test.");

    cy.get('input[placeholder="Conference Room A"]')
      .type("Conference Room B");

    cy.get('input[type="url"][placeholder^="https://grabdocs.com"]')
      .type("https://grabdocs.com/join-meeting?meeting_id=delete-test");

    cy.get('input[type="email"][placeholder="email@example.com"]')
      .type("testuser@example.com");

    cy.get('input[placeholder="Name (optional)"]')
      .type("Delete Test User");

    cy.contains("button", "15 min before").click();

    cy.get(".peer").first().click({ force: true });

    cy.contains("button", /^Create Event$/)
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    // Back on main calendar
    cy.location("pathname", { timeout: 10000 })
      .should("include", "/calendar");

    // 2) Click the "Total Events" card
    cy.contains("button", "Total Events")
      .should("be.visible")
      .click();

    // 3) In the All Events list, click the specific event card by title
    cy.contains("h4", eventTitle)
      .should("be.visible")
      .click();

    // 4) Click the red trash icon button
    cy.get(
      'button.inline-flex.items-center.px-4.py-2.border.border-red-300.dark\\:border-red-600'
    )
      .should("be.visible")
      .click({ force: true });

    // 5) Confirm in the Delete Event dialog
    cy.contains("button", /^Delete Event$/)
      .should("be.visible")
      .click({ force: true });

    // 6) Verify the event no longer appears in All Events
    cy.contains("h4", eventTitle, { timeout: 10000 })
      .should("not.exist");
  });
  it("Edits the most recently created Cypress event", () => {
    cy.visit("https://app.grabdocs.com/calendar", { failOnStatusCode: false });
    cy.location("pathname").should("include", "/calendar");

    // 1) Click on the “Total Events” card
    cy.contains("button", "Total Events")
      .should("be.visible")
      .click({ force: true });

    // 2) Click the FIRST event in the list
    cy.get("div.border.border-gray-200.dark\\:border-gray-700.rounded-lg.p-3")
      .first()
      .click({ force: true });

    // 3) Click the EDIT (pencil icon) button
    //    (fix: ONLY click the icon-only gray inline-flex button → avoids Google Calendar)
    cy.get(
      'button.inline-flex.items-center.px-4.py-2.border.border-gray-300.dark\\:border-gray-600.rounded-lg'
    )
      .filter((_, el) => el.textContent.trim() === "") // ensures it clicks icon-only button
      .first()
      .should("be.visible")
      .click({ force: true });

    // ---- Now the edit form opens ----

    // Update title
    const newTitle = `Cypress Edited Event ${Date.now()}`;
    cy.get('input[placeholder="Team Meeting, Client Call, etc."]')
      .clear()
      .type(newTitle);

    // Update description
    cy.get('textarea[placeholder="Add details about the event..."]')
      .clear()
      .type("This event was edited by Cypress.");

    // Change start time to 4:30 PM
    cy.get('input[type="time"]').first().clear().type("16:30");

    // Change end time to 5:30 PM
    cy.get('input[type="time"]').eq(1).clear().type("17:30");

    // Change location
    cy.get('input[placeholder="Conference Room A"]')
      .clear()
      .type("Conference Room C");

    // Change meeting URL
    cy.get('input[type="url"]')
      .clear()
      .type("https://grabdocs.com/join-meeting?meeting_id=EDITED");

    // Click Save / Update Event
    cy.contains("button", /^Save|Update Event$/i)
      .should("be.visible")
      .click({ force: true });

    // Confirm updated title appears
    cy.contains(newTitle, { timeout: 15000 }).should("be.visible");
  });
});