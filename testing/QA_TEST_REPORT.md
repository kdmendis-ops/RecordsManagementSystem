# Team Informatics API Quality Assurance Test Report

**Tester:** Deepak Sharma  
**Student ID:** 300619814  
**Role:** Quality Assurance Tester  
**Application:** Team Informatics Healthcare Surveys  
**Testing Tool:** VS Code REST Client and Cypress  
**Test Date:** August 15, 2026  
**Server:** http://localhost:5001

## Testing Objective

The purpose of this testing was to confirm that the Team Informatics Healthcare Surveys API supports user authentication, authorization and complete CRUD operations for healthcare surveys.

## Test Results

| Test ID | Test Description | Method and Endpoint | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| QA-01 | Start backend server | npm run dev | API starts on port 5001 | API started on port 5001 | PASS |
| QA-02 | Register staff user | POST /api/auth/register | User created and token returned | 201 Created; staff user and token returned | PASS |
| QA-03 | Login with valid credentials | POST /api/auth/login | Login succeeds and token is returned | 200 OK; token and user returned | PASS |
| QA-04 | Login with incorrect password | POST /api/auth/login | Incorrect credentials are rejected | 401 Unauthorized | PASS |
| QA-05 | Access protected route without token | GET /api/auth/me | Request is rejected | 401 Unauthorized | PASS |
| QA-06 | Create healthcare survey | POST /api/surveys | Survey is created | 201 Created | PASS |
| QA-07 | Retrieve survey list | GET /api/surveys | Created survey is returned | 200 OK; survey returned | PASS |
| QA-08 | Update healthcare survey | PATCH /api/surveys/:id | Survey details are updated | 200 OK; updated information returned | PASS |
| QA-09 | Retrieve one survey | GET /api/surveys/:id | Selected survey is returned | 200 OK; selected survey returned | PASS |
| QA-10 | Delete healthcare survey | DELETE /api/surveys/:id | Survey is removed | 204 No Content | PASS |
| QA-11 | Confirm survey deletion | GET /api/surveys/:id | Deleted survey is not found | 404 Not Found | PASS |

## Cypress Automated UI Testing

Cypress was used to verify that the Team Informatics frontend loads correctly and displays the required interface elements.

| Test ID | Test Description | Actual Result | Status |
|---|---|---|---|
| CY-01 | Load the application | Application loaded successfully | PASS |
| CY-02 | Display Team Informatics heading | Heading displayed correctly | PASS |
| CY-03 | Display Sign in section | Sign in section displayed | PASS |
| CY-04 | Display Register staff section | Register staff section displayed | PASS |

## Testing Conclusion

All tested authentication, authorization, survey CRUD, and Cypress UI functions performed according to the expected results. No critical defects were identified during this testing cycle. The tested application is ready for the project demonstration.
