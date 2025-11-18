describe("Feature 09 – Forms / Edit Registration Form Fields", () => {
  beforeEach(() => {
    cy.loginGrabDocs(); // Login to Grabdocs
  });

  it("edits First Name, Last Name, Email, Company, and Registration Type fields", () => {
    cy.visit("https://app.grabdocs.com/forms", { failOnStatusCode: false });
    cy.location("pathname").should("include", "/forms");

    cy.contains("h3", "Registration Form")
      .should("be.visible")
      .click();

    // -------- FIRST NAME --------
    cy.contains("label", "First Name")
      .should("be.visible")
      .closest(".group")
      .click();

    cy.contains("h3", "Edit Field").should("be.visible");

    const firstNameTitle = "First Name (Given)";
    const firstNamePlaceholder = "Enter your given name";

    cy.contains("label", "Field Title")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(firstNameTitle);

    cy.contains("label", "Placeholder")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(firstNamePlaceholder);

    cy.contains("label", "Required field")
      .prev('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(1000);

    cy.contains("h3", "Edit Field")
      .parent()
      .find("button")
      .last()
      .click();

    // -------- LAST NAME --------
    cy.contains("label", "Last Name")
      .should("be.visible")
      .closest(".group")
      .click();

    cy.contains("h3", "Edit Field").should("be.visible");

    const lastNameTitle = "Last Name (Family)";
    const lastNamePlaceholder = "Enter your family name";

    cy.contains("label", "Field Title")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(lastNameTitle);

    cy.contains("label", "Placeholder")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(lastNamePlaceholder);

    cy.contains("label", "Required field")
      .prev('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(1000);

    cy.contains("h3", "Edit Field")
      .parent()
      .find("button")
      .last()
      .click();

    // -------- EMAIL ADDRESS --------
    cy.contains("label", "Email Address")
      .should("be.visible")
      .closest(".group")
      .click();

    cy.contains("h3", "Edit Field").should("be.visible");

    const emailTitle = "Work Email Address";
    const emailPlaceholder = "your.email@university.edu";

    cy.contains("label", "Field Title")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(emailTitle);

    cy.contains("label", "Placeholder")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(emailPlaceholder);

    cy.contains("label", "Required field")
      .prev('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(1000);

    cy.contains("h3", "Edit Field")
      .parent()
      .find("button")
      .last()
      .click();

    // -------- COMPANY --------
    cy.contains("label", "Company")
      .should("be.visible")
      .closest(".group")
      .click();

    cy.contains("h3", "Edit Field").should("be.visible");

    const companyTitle = "Organization / Company";
    const companyPlaceholder = "Your school or company name";

    cy.contains("label", "Field Title")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(companyTitle);

    cy.contains("label", "Placeholder")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(companyPlaceholder);

    cy.contains("label", "Required field")
      .prev('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(1000);

    cy.contains("h3", "Edit Field")
      .parent()
      .find("button")
      .last()
      .click();

    // -------- REGISTRATION TYPE --------
    cy.contains("label", "Registration Type")
      .should("be.visible")
      .closest(".group")
      .click();

    cy.contains("h3", "Edit Field").should("be.visible");

    const regTypeTitle = "Registration Type (Tier)";

    cy.contains("label", "Field Title")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type(regTypeTitle);

    cy.contains("label", "Placeholder")
      .parent()
      .find('input[type="text"]')
      .clear()
      .type("Choose registration tier");

    cy.get('input[value="Student - $99"]')
      .clear()
      .type("Student - $129");

    cy.contains("label", "Required field")
      .prev('input[type="checkbox"]')
      .check({ force: true });

    cy.wait(1000);

    cy.contains("h3", "Edit Field")
      .parent()
      .find("button")
      .last()
      .click();

    // -------- SAVE + ASSERT --------
    cy.get('button[title="Save Form"]')
      .should("be.visible")
      .click();

    cy.contains(".text-sm.font-medium", firstNameTitle).should("be.visible");
    cy.contains(".text-sm.font-medium", lastNameTitle).should("be.visible");
    cy.contains(".text-sm.font-medium", emailTitle).should("be.visible");
    cy.contains(".text-sm.font-medium", companyTitle).should("be.visible");
    cy.contains(".text-sm.font-medium", regTypeTitle).should("be.visible");
  });
});