Grabdocs Cypress Automation – README
Overview

The 00_Bookmark.cy.js within the e2e file contains code that tests certain functions of the bookmark feature in an webapp called Grabdocs

This project also contains end-to-end Cypress tests written to validate core functionality of other Grabdocs functions, including:

Login

File upload + download

Chat + chat history

Video meetings

Quick upload links

Calendar events (create, edit, delete)

Forms editing

Settings navigation & interactions

Analytics pages

Logout flows

Feedback submission

Workspaces

Each feature has its own test file inside the cypress/e2e/ directory for easy organization and navigation.

Project Structure

cypress/

 ├── e2e/
 
 │    ├── 1_login.cy.js
 
 │    ├── 2_upload.cy.js
 
 │    ├── 3_download.cy.js
 
 │    ├── 4_feedbackAsk.cy.js
 
 │    ├── 5_chat.cy.js
 
 │    ├── 6_videoMeeting.cy.js
 
 │    ├── 7_quickLinks.cy.js
 
 │    ├── 8_calendar.cy.js
 
 │    ├── 9_forms.cy.js
 
 │    ├── 10_profile.cy.js
 
 │    ├── 11_analytics.cy.js
 
 │    ├── 12_workspace.cy.js
 
 │    ├── 13_chatHistory.cy.js
 
 │    ├── 14_logout.cy.js
 
 │    ├── 15_feedbackPage.cy.js
 
 │    ├── 16_settings.cy.js
 
 │
 
 ├── fixtures/
 
 │    └── GrabdocsSamplePDF.pdf
 
 │
 
 ├── support/
 
 │    ├── commands.js   <-- Custom login to help with testing
 
 │    └── e2e.js
 
 │
 
 ├── videos/
 
 └── screenshots/
