/*
 * Frontend API endpoint configuration.
 *
 * Local development uses the existing Tomcat address.
 * Before using the GitHub Pages website with a cloud backend, replace
 * CLOUD_API_BASE with the public HTTPS URL of your deployed Tomcat service.
 * Example format: https://your-backend.example.com/green-campus/api
 *
 * This file must never contain database passwords or admin API keys.
 */
(() => {
    const isLocalDevelopment =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    const LOCAL_API_BASE = "http://localhost:8081/green-campus/api";
    const CLOUD_API_BASE = "https://YOUR-BACKEND-HOST/green-campus/api";

    window.GREEN_CAMPUS_API_BASE =
        isLocalDevelopment ? LOCAL_API_BASE : CLOUD_API_BASE;
})();
