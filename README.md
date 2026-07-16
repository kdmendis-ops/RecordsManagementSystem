# Team Informatics Healthcare Surveys

An Express, Node.js, MongoDB MVC application for staff to manage healthcare patient-feedback surveys. It includes authentication, authorization, REST APIs, a browser interface, and survey-response collection.

## Setup in Visual Studio Code

1. Install [Node.js](https://nodejs.org/) and start a local MongoDB service (or use a MongoDB Atlas connection string).
2. Open this folder in Visual Studio Code.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` and a secure `JWT_SECRET`.
4. For the API, run `npm install`, then `npm run dev` from the project root.
5. For the React/Vite client, open a second terminal, run `cd client`, `npm install`, then `npm run dev`.
6. Browse to the Vite address shown in the terminal (usually `http://localhost:5173`).

## Required MERN skeleton layout

The project now follows the layout requested in the supplied screenshots: `client/` contains `assets`, `core`, `public`, `src`, `MainRouter.jsx`, `theme.jsx`, and Vite configuration. The root also includes `config/config.js` and a `server/` folder with `controllers`, `helpers`, `models`, `routes`, `assets-router.js`, `express.js`, and `server.js`. The server files expose the working Team Informatics survey MVC implementation using the course naming convention.

Register a new staff user first. Staff can create, read, update, and delete their own surveys; an `admin` can manage all surveys and users. A `patient` account only sees published surveys.

## Database collections

- `users`: name, email, hashed password, role (`patient`, `staff`, `admin`)
- `surveys`: title, department, status, questions, creator
- `responses`: submitted answers linked to a survey

## Agile project management

The project Product Backlog and Kanban Task Board are in `PROJECT_MANAGEMENT.md`. A card list for recreating the board in Trello is available in `trello-cards.csv`.

## API test examples

Use Postman, Thunder Client, or VS Code REST Client. After registration/login, copy the returned token into `Authorization: Bearer <token>`.

```http
POST /api/auth/register
Content-Type: application/json

{"name":"Jordan Lee","email":"jordan@teaminformatics.org","password":"password123"}

POST /api/auth/login
Content-Type: application/json

{"email":"jordan@teaminformatics.org","password":"password123"}

POST /api/surveys
Authorization: Bearer <token>
Content-Type: application/json

{"title":"Outpatient Visit Feedback","department":"Outpatient Care","description":"Help us improve your visit.","status":"published","questions":[{"prompt":"How would you rate your visit?","type":"rating","required":true}]}
```

CRUD routes: `GET/POST /api/surveys`, `GET/PATCH/DELETE /api/surveys/:id`, `GET/PATCH/DELETE /api/users/:id`. Authentication routes: `POST /api/auth/register`, `POST /api/auth/login`, and protected `GET /api/auth/me`.
