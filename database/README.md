# Green Campus Database Setup

## Choose the correct SQL file

- **Local reset/testing:** `green_campus.sql` creates `green_campus`, drops existing project tables, recreates them, and inserts sample rows. It is destructive: do not run it if you need to keep existing records.
- **Cloud/managed MySQL:** `green_campus_cloud.sql` creates the tables in the database you have already selected and inserts sample rows with `INSERT IGNORE`. It does not create a database or drop existing tables. Use it with a new/empty application database.

The schema contains:

- `users` — registration/login accounts
- `resources` — resources for the Java CRUD experiment
- `consumption_records` — resource consumption
- `sustainability_metrics` — sustainability metric records
- `sustainability_reports` — reports submitted through the website

## Local configuration

The Java application reads these settings:

- `GREEN_CAMPUS_DB_URL` — optional full JDBC URL; defaults to the local `green_campus` database
- `GREEN_CAMPUS_DB_USER` — optional; defaults to `root`
- `GREEN_CAMPUS_DB_PASSWORD` — required password, read from the environment
- `GREEN_CAMPUS_ALLOWED_ORIGINS` — optional comma-separated browser origins allowed to call the Servlet API
- `GREEN_CAMPUS_ADMIN_API_KEY` — required for Servlet CRUD write operations on resources, consumption records, and sustainability metrics

You can also provide database URL/user/password as Java system properties, as described in `DBConnection.java`. Do not commit passwords or admin keys to GitHub.

## Local frontend and backend addresses

There are two backend entry points in this project:

- **Servlet web application on Tomcat:** `http://localhost:8081/green-campus/api`. This is the API configured for the registration, login, reports, and live-metrics frontend.
- **Standalone `ApiServer` experiment:** runs separately on its configured local port (currently 8080) and is for the standalone HTTP-server experiment. It is not the API base used by `js/api.js`.

The frontend's `js/config.js` selects the local Tomcat API URL while running on `localhost` or `127.0.0.1`. When deployed on GitHub Pages, update its cloud URL placeholder after you deploy the backend publicly.

For public hosting steps, see the repository's `DEPLOYMENT_GUIDE.md`.
