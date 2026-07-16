# Team Informatics Agile Project Management

**Tool:** Trello (board-ready backlog and task board below)  
**Board name:** Team Informatics Healthcare Survey App – Release 1  
**Sprint:** Release 1 / two-week sprint  
**Product goal:** Deliver a secure first release that lets healthcare staff manage patient-feedback surveys.

## Product Backlog

| ID | User story | Priority | Story points | Acceptance criteria | Status |
|---|---|---:|---:|---|---|
| CV-01 | As a staff member, I want to register and log in so that only recognised users access management features. | Must | 5 | Register and login return a JWT; passwords are hashed. | Done |
| CV-02 | As a staff member, I want to create a healthcare survey so I can collect patient feedback. | Must | 5 | Title, department, status, and at least one question are saved. | Done |
| CV-03 | As a staff member, I want to view surveys so I can monitor the surveys I own. | Must | 3 | Survey list is displayed with survey details and status. | Done |
| CV-04 | As a staff member, I want to edit a survey so I can keep questions and details accurate. | Must | 5 | The owner/admin can update an existing survey. | Done |
| CV-05 | As a staff member, I want to delete a survey so I can remove invalid or obsolete drafts. | Must | 3 | The owner/admin can delete a survey after confirmation. | Done |
| CV-06 | As a patient, I want to see published surveys only so I can provide feedback on active surveys. | Must | 3 | Draft and closed surveys are hidden from patients. | Done |
| CV-07 | As a patient, I want to submit answers so that the healthcare team can improve services. | Should | 5 | Responses are stored against a published survey. | Done |
| CV-08 | As an administrator, I want role-based access so I can manage users and all surveys. | Must | 5 | Patient, staff, and admin permissions are enforced. | Done |
| CV-09 | As a developer, I want API testing evidence so I can confirm each endpoint works. | Must | 3 | README contains Postman/Thunder Client request examples. | Done |
| CV-10 | As a user, I want survey-response reporting so I can understand satisfaction trends. | Could | 8 | Dashboard summarises ratings and text feedback. | To Do |

## Task Board

### To Do

- **CV-10:** Design response-reporting dashboard (8 points)
- Create Postman collection export and attach screenshots of tested APIs (3 points)
- Deploy the API and client to a hosting platform (5 points)

### In Progress

- No tasks currently in progress.

### Done

- **CV-01:** Authentication with registration, login, and JWT tokens
- **CV-02:** Survey creation API and form
- **CV-03:** Survey list API and dashboard
- **CV-04:** Survey edit API and form
- **CV-05:** Survey deletion API and confirmation
- **CV-06:** Published-survey access rules
- **CV-07:** Survey response model and API
- **CV-08:** Staff/patient/admin authorization
- **CV-09:** API examples in README
- Create Node/Express/MongoDB MVC project structure
- Create React/Vite client structure

## How to recreate this in Trello

1. Create a Trello board named **Team Informatics Healthcare Survey App – Release 1**.
2. Add lists: **Product Backlog**, **To Do**, **In Progress**, and **Done**.
3. Create one card for each `CV-01` to `CV-10` backlog item.
4. Add the priority and story points from the Product Backlog table to each card.
5. Move the cards into the matching Task Board list above.

For submission evidence, take one screenshot showing the board name and all four lists after recreating it in Trello.
