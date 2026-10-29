/* =========================================================
   GREEN CAMPUS API CLIENT
   API URL is set in js/config.js. Never place secrets here.
   ========================================================= */

const GREEN_CAMPUS_API =
    (window.GREEN_CAMPUS_API_BASE || "http://localhost:8081/green-campus/api")
        .replace(/\/+$/, "");

async function readJsonResponse(response) {
    let result;

    try {
        result = await response.json();
    } catch (error) {
        throw new Error(
            `The API returned an invalid response (HTTP ${response.status}).`
        );
    }

    if (!response.ok) {
        throw new Error(
            result.message || `The API request failed (HTTP ${response.status}).`
        );
    }

    return result;
}

async function postForm(endpoint, data) {
    const body = new URLSearchParams(data);

    const response = await fetch(`${GREEN_CAMPUS_API}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body
    });

    const result = await readJsonResponse(response);

    if (!result.success) {
        throw new Error(result.message || "The server request failed.");
    }

    return result;
}

const GreenCampusAPI = {
    register(user) {
        return postForm("register", user);
    },

    login(credentials) {
        return postForm("login", credentials);
    },

    submitReport(report) {
        return postForm("report", report);
    },

    async getSustainabilityMetrics() {
        const response = await fetch(`${GREEN_CAMPUS_API}/sustainability-metrics`);
        const result = await readJsonResponse(response);

        if (!Array.isArray(result)) {
            throw new Error(
                result.message || "The API did not return a metrics list."
            );
        }

        return result;
    }
};
