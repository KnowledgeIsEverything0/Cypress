describe("Feature – Bookmark", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  const bookmarkBaseName = 'Cypress Bookmark';
  const bookmarkName = `${bookmarkBaseName} ${Date.now()}`;
  const updatedBookmarkName = `${bookmarkName} (updated)`;
  const bookmarkDescription = 'Created by Cypress automated test';
  const updatedBookmarkDescription = 'Updated by Cypress automated test';
  
  // Test 1. Open global bookmark panel from header
  it('opens the global bookmarks panel from the header', () => {
    cy.get('button[title="Show Bookmarks"]').click();
    cy.wait(3000);
  });
   
  // Test 2. Navigate to Files and open bookmark menu
  it("navigates to Files via Quick Apps and opens the Files bookmark menu", () => {
    cy.get('button[title="Quick Apps"]').click();
    cy.wait(3000);
    cy.contains("Files").click();
    cy.wait(3000);
    cy.url().should("include", "/files");
    cy.wait(3000);
    cy.get('button[title="View Bookmarks"]').click();
    cy.wait(3000);
  });

  // Test 3. Create a new bookmark
   it("creates a new bookmark in Files for a selected file", () => {
    cy.get('button[title="Quick Apps"]').click();
    cy.wait(3000);
    cy.contains("Files").click();
    cy.wait(3000);
    cy.url().should("include", "/files");

    // Select first file
    cy.get('input[type="checkbox"].h-4.w-4')
      .first()
      .check({ force: true });
      cy.wait(3000);

    // Open bookmark menu
    cy.get('button[title="View Bookmarks"]').click();
    cy.wait(3000);

    // Opens bookmark creation form
    cy.contains("+ New Bookmark").click();
    cy.wait(3000);

    // Fill out form
    cy.get('input[placeholder="Bookmark name"]').type(bookmarkName);
    cy.get('textarea[placeholder="Optional description"]').type(bookmarkDescription);
    cy.wait(3000);

    // Red color selector
    cy.get('button[style*="239, 68, 68"]').click();
    cy.wait(3000);

    // Submit bookmark form
    cy.contains('button[type="submit"]', "Create").click();
    cy.wait(3000);

    //Open bookmark menu to see if menu was created
    cy.get('button[title="View Bookmarks"]').click();
    cy.wait(3000);
  });

  // Test 4. Toggle file list for the bookmark From Files Tab
it("toggles the file list within an existing bookmark from Files page", () => {
  cy.get('button[title="Quick Apps"]').click();
  cy.wait(3000);
  cy.contains("Files").click();
  cy.wait(3000);

  cy.get('button[title="View Bookmarks"]').click();
  cy.wait(3000);

  // Scope to a bookmark card so we don't hit the wrong toggle elsewhere
  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")
    .first()
    .within(() => {

      // Step 1: Expand by clicking the numeric toggle button (text is only digits)
      cy.get('button.inline-flex.items-center')
        .filter((_, el) => /^\d+$/.test(el.innerText.trim()))
        .first()
        .click();

      cy.wait(1000);

      // Step 2: Confirm expanded state (button text becomes Hide)
      cy.contains('button', /^Hide$/).should('be.visible');

      // Optional: confirm chevron rotates
      cy.contains('button', /^Hide$/).find('svg').should('have.class', 'rotate-180');

      // Step 3: Collapse again
      cy.contains('button', /^Hide$/).click();

      cy.wait(1000);

      // Step 4: Confirm collapsed state (Hide is gone, numeric toggle returns)
      cy.contains('button', /^Hide$/).should('not.exist');
      cy.get('button.inline-flex.items-center')
        .filter((_, el) => /^\d+$/.test(el.innerText.trim()))
        .should('be.visible');
    });
});

  // Test 5. Edit A Bookmark From File Tab
  it("edits an existing bookmark in Files", () => {
  cy.get('button[title="Quick Apps"]').click();
  cy.wait(3000);
  cy.contains("Files").click();
  cy.wait(3000);
  cy.get('button[title="View Bookmarks"]').click();
  cy.wait(3000);

  // Find the bookmark card by its truncated title and scope inside that card
  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")   // the bookmark card container
    .first()
    .within(() => {
      // In this card, click the EDIT button (first small gray icon button)
      cy.get("button.p-1.text-gray-400").first().click();
    });

  cy.wait(3000);

  // Update the bookmark name
  cy.get('input[placeholder="Bookmark name"]')
    .clear()
    .type("Cypress Bookmark (updated)");
  cy.wait(3000);

  // Update the bookmark description
  cy.get('textarea[placeholder="Optional description"]')
    .clear()
    .type("Updated description");
  cy.wait(3000);

  // Submit update form
  cy.contains('button[type="submit"]', "Update").click();
  cy.wait(3000);

  // Verify a bookmark with the truncated title is still visible
  cy.contains("h4", "Cypress Bookmar").should("be.visible");
  });

  // Test 6. Delete A Bookmark From File Tab
  it("deletes the bookmark from the Files page", () => {
  cy.get('button[title="Quick Apps"]').click();
  cy.wait(3000);
  cy.contains("Files").click();
  cy.wait(3000);
  cy.get('button[title="View Bookmarks"]').click();
  cy.wait(3000);

  // Locate bookmark card
  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")
    .first()
    .within(() => {
      // DELETE button = 2nd gray icon button
      cy.get("button.p-1.text-gray-400").eq(1).click();
    });
  cy.wait(3000);
  });

  // Test 7. Edit A Bookmark From Homepage
  it("edits the bookmark from the homepage bookmark panel", () => {
  cy.visit("/");
  cy.wait(3000);

  cy.get('button[title="Show Bookmarks"]').click();
  cy.wait(3000);

  // Find the bookmark card by truncated title
  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")
    .first()
    .within(() => {
      // Edit button inside the card
      cy.get("button.p-1.text-gray-400").first().click();
    });

  cy.wait(3000);

  // Update name and description
  cy.get('input[placeholder="Bookmark name"]')
    .clear()
    .type("Cypress Bookmark (home updated)");
  cy.wait(3000);

  cy.get('textarea[placeholder="Optional description"]')
    .clear()
    .type("Updated using the homepage");
  cy.wait(3000);

  cy.contains('button[type="submit"]', "Update").click();
  cy.wait(3000);
  cy.contains("h4", "Cypress Bookmar").should("be.visible");
  });

  // Test 8. Delete A Bookmark From Homepage
  it("deletes the bookmark from the homepage bookmark panel", () => {
  cy.visit("/");
  cy.wait(3000);

  // Open homepage bookmark panel
  cy.get('button[title="Show Bookmarks"]').click();
  cy.wait(3000);

  // Find the correct bookmark card by truncated title
  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")
    .first()
    .within(() => {
      // DELETE button = second gray icon button
      cy.get("button.p-1.text-gray-400").eq(1).click();
    });
  cy.wait(3000);
  });

  // Test 9. Toggle File List from Homepage
  it("toggles the file list for the bookmark from the homepage bookmark menu", () => {
  cy.visit("/");
  cy.wait(3000);

  cy.get('button[title="Show Bookmarks"]').click();
  cy.wait(3000);

  cy.contains("h4", "Cypress Bookmar")
    .parents("div.border.border-gray-200")
    .first()
    .within(() => {

      // Expand (numeric toggle)
      cy.get('button.inline-flex.items-center')
        .filter((_, el) => /^\d+$/.test(el.innerText.trim()))
        .first()
        .click();

      cy.wait(1000);

      // Expanded state = Hide button visible
      cy.contains('button', /^Hide$/).should('be.visible');

      // Collapse
      cy.contains('button', /^Hide$/).click();

      cy.wait(1000);

      // Back to collapsed state
      cy.contains('button', /^Hide$/).should('not.exist');
    });
  });
});
