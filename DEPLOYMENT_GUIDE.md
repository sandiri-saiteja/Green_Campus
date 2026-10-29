# Green Campus — Local and Public Deployment Guide

This guide explains how the GitHub Pages frontend, Tomcat Servlet API, and MySQL database fit together.

## Important: GitHub Pages cannot run Tomcat

GitHub Pages hosts static files such as HTML, CSS, JavaScript, images, and XML. It does **not** run Java Servlets, Tomcat, or MySQL.

Installing Tomcat on your own Windows computer only makes it available on that computer. It does not make it a global/public server. To make registration, login, report submission, and live database metrics work for visitors to your GitHub Pages URL, you must deploy the Java WAR to a public HTTPS web service and use a managed MySQL database that the service can reach.

## What was corrected in this project

- `js/config.js` selects the local API URL while developing on `localhost`; for the GitHub Pages site it points to a clearly marked cloud URL placeholder.
- `js/api.js` uses that configurable API URL and includes a method to retrieve live sustainability metrics.
- `js/live-metrics.js` renders records returned by `/api/sustainability-metrics` on the Reports and Metrics pages. The cards no longer use hard-coded values for that live panel.
- `DBConnection.java` supports database URL, username, and password supplied through environment variables.
- The Servlet performs additional server-side registration/report validation.
- Servlet CRUD write routes for resources, consumption records, and sustainability metrics require the `GREEN_CAMPUS_ADMIN_API_KEY` environment secret in the `X-Green-Campus-Admin-Key` request header. Do not place this key in frontend JavaScript.
- `database/green_campus_cloud.sql` bootstraps the schema without dropping tables or attempting to create the provider's database.
- The Java build targets Java 21, and the included Dockerfile builds the WAR and runs it on Tomcat 11.

## Update your existing GitHub repository without losing earlier work

The corrected ZIP is designed to be extracted **over your existing local `Kothii` project folder**. It does not contain the `.git` folder or Maven `target` build outputs.

1. Download `Green_Campus_Corrected_Project.zip` and extract it.
2. Copy/extract its contents into your existing local `Kothii` folder, allowing updated files to be replaced. Do not delete the existing folder and do not delete its hidden `.git` folder.
3. Open PowerShell and go to your existing project folder:

   ```powershell
   cd "C:\Users\SANDIRI SAI TEJA\OneDrive\Desktop\Kothii"
   git status
   ```

4. Review the changed files, then upload the updates to the same `main` branch:

   ```powershell
   git add .
   git commit -m "Connect live metrics and prepare cloud deployment"
   git push origin main
   ```

5. Open the existing GitHub repository and wait for its Pages deployment to finish.

This updates the existing repository and preserves its commit history. It does not create a new repository. If `git status` reports unexpected deletions or if Git asks to resolve conflicts, stop and review before committing.

## A. Local testing

1. Start MySQL and use your existing local `green_campus` database.
2. Set `GREEN_CAMPUS_DB_PASSWORD` in Windows Environment Variables, or use the Java system property `green.campus.db.password`.
3. Keep `js/config.js` on its local setting when opening the site using VS Code Live Server on `localhost` or when using local Tomcat.
4. Build the backend from the `java` folder with Maven and deploy `java/target/green-campus.war` to your local Tomcat `webapps` folder.
5. The local API base is `http://localhost:8081/green-campus/api` for the existing local Tomcat setup.
6. For local Servlet CRUD write requests, configure `GREEN_CAMPUS_ADMIN_API_KEY` in the Tomcat process environment and send the matching `X-Green-Campus-Admin-Key` header. The separate standalone Java CRUD program continues to use its DAO classes.

Do not put real passwords or keys into `js/config.js`, Java source, or a committed `.env` file.

## B. Public deployment overview

Choose a hosting provider that supports Docker-based web services and a separate managed MySQL service. Exact dashboard names vary by provider.

### 1. Create a managed MySQL database

- Create a new database/schema in your MySQL provider.
- Use the provider's private/internal connection address if the web service runs in the same provider/network.
- Ensure the database accepts connections from the backend service and requires TLS/SSL where the provider recommends it.
- Run `database/green_campus_cloud.sql` against the new, empty database.
- **Do not run `database/green_campus.sql` against a database that contains data you need.** That original local setup script drops and recreates tables.

### 2. Deploy the Java backend using Docker

- Connect your existing GitHub repository to a Docker-capable web-service host.
- Use the repository root as the build context and `Dockerfile` as the Dockerfile.
- The Dockerfile builds `java/` with Maven and packages `green-campus.war` into Tomcat 11.
- Wait for the service build to finish and copy its public HTTPS service URL.

Set these environment variables in the hosting dashboard's secret/environment settings:

| Variable | Value |
|---|---|
| `GREEN_CAMPUS_DB_URL` | Full JDBC URL for the managed database, e.g. `jdbc:mysql://DB_HOST:3306/DB_NAME?sslMode=REQUIRED&serverTimezone=UTC` (use the exact host, port, database name, and TLS parameters supplied by your provider) |
| `GREEN_CAMPUS_DB_USER` | Database username created/provided for this application |
| `GREEN_CAMPUS_DB_PASSWORD` | The database password; add it only in the provider's secret settings |
| `GREEN_CAMPUS_ALLOWED_ORIGINS` | `https://sandiri-saiteja.github.io` (add other exact origins only if you use them) |
| `GREEN_CAMPUS_ADMIN_API_KEY` | A long, random secret for administrator-only Servlet CRUD write routes |

Do not use `root` for a public hosted database unless your provider explicitly requires a restricted root-like account. Prefer a dedicated database user with access only to this project's schema.

### 3. Configure the frontend to use the deployed backend

After the backend has a public HTTPS URL, edit `js/config.js` and replace:

`https://YOUR-BACKEND-HOST/green-campus/api`

with the actual backend URL, keeping `/green-campus/api` at the end. For example, if the service base URL is `https://green-campus-api.example.com`, the API base becomes:

`https://green-campus-api.example.com/green-campus/api`

Commit and push this change to your existing `main` branch. GitHub Pages will rebuild the static website. The backend URL is public configuration; database credentials and the admin API key are secrets and must never be committed.

### 4. Verify the deployed backend before testing forms

Open these endpoints using your actual backend host:

- `/green-campus/api/health` — should return a success JSON response.
- `/green-campus/api/sustainability-metrics` — should return a JSON list from MySQL.

If the health endpoint works but metrics fail, check the database URL, username/password, database schema, network access, and backend logs. If the browser reports a CORS error, confirm `GREEN_CAMPUS_ALLOWED_ORIGINS` matches the exact website **origin** (scheme + hostname; no page path).

### 5. Test the public website

- Register a test account with valid inputs.
- Try invalid registration values and confirm that both browser-side and server-side validation reject them.
- Log in with the test account.
- Open Reports and Metrics; the live metrics panel should show the records stored in MySQL.
- Submit a report and confirm it appears in `sustainability_reports`.
- Test the weather search and chart; those requests go directly from the browser to Open-Meteo.
- Check the browser Developer Tools → Network tab for failed API requests.

## Security limitation before real public use

This is an academic project baseline, not a production-hardened authentication system. The current browser login stores a user profile in `localStorage`; that is not a secure server session, and the current password hashing approach should be replaced with a slow password-hashing algorithm such as BCrypt or Argon2 before real accounts are used. Report ownership also needs a server-authenticated identity rather than trusting an email supplied by the browser. Keep the hosted instance limited to demonstration/test data until these authentication and authorization improvements are made.

The frontend's validation improves usability, but validation in the browser can be bypassed. The backend must remain responsible for validating all incoming values.
