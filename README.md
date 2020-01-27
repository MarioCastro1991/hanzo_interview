# hanzo_interview
Test cases developed using Cypress for the SDET interview at Hanzo.

cypress.json: this file was modified because Cypress works from within the browser and it must be able 
to directly communicate with your remote application at all times. Unfortunately, 
browsers naturally try to prevent Cypress from doing this. So the cypress.json needed to be updated to avoid security issues from the Goolge Chrome browser.
Info from https://docs.cypress.io/guides/guides/web-security.html#Limitations.

Note the workspace hanzo was created for test workspace so that it should not be modified.
