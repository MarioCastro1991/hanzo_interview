# hanzo_interview
Test cases developed using Cypress for the SDET interview at Hanzo.

hanzo_interview.js: this files contains the automated test cases using cypress.

cypress.json: this file was modified because Cypress works from within the browser and it must be able 
to directly communicate with your remote application at all times. Unfortunately, 
browsers naturally try to prevent Cypress from doing this. To overcome this limitation from Cypress, the cypress.json file was  updated to avoid security issues using the Google Chrome browser.
Info from https://docs.cypress.io/guides/guides/web-security.html#Limitations.

Note that the slack workspace "hanzo" is a test slack workspace and it shouldn't be modified so the results can be repeatable.
