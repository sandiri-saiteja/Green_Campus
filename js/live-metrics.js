/* Loads sustainability metrics from MySQL through the Java Servlet API. */
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("campusMetricsContainer");
    if (!container || typeof GreenCampusAPI === "undefined") return;

    const showMessage = (message, type = "secondary") => {
        container.replaceChildren();
        const alert = document.createElement("div");
        alert.className = `alert alert-${type} mb-0`;
        alert.setAttribute("role", "status");
        alert.textContent = message;
        container.appendChild(alert);
    };

    const formatNumber = (value) => {
        const number = Number(value);
        return Number.isFinite(number)
            ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(number)
            : String(value ?? "—");
    };

    try {
        showMessage("Loading live sustainability metrics from the database…", "info");
        const metrics = await GreenCampusAPI.getSustainabilityMetrics();

        if (metrics.length === 0) {
            showMessage("No sustainability metrics have been added to the database yet.", "warning");
            return;
        }

        container.replaceChildren();
        const grid = document.createElement("div");
        grid.className = "row g-3";

        metrics.forEach((metric) => {
            const column = document.createElement("div");
            column.className = "col-md-6";

            const card = document.createElement("article");
            card.className = "card h-100 border-0 shadow-sm";

            const body = document.createElement("div");
            body.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title text-success";
            title.textContent = metric.metricName || "Sustainability metric";

            const value = document.createElement("p");
            value.className = "display-6 fw-semibold mb-2";
            value.textContent = `${formatNumber(metric.metricValue)} ${metric.unit || ""}`.trim();

            const date = document.createElement("p");
            date.className = "small text-muted mb-2";
            date.textContent = metric.metricDate ? `Recorded: ${metric.metricDate}` : "";

            const description = document.createElement("p");
            description.className = "card-text";
            description.textContent = metric.description || "No description provided.";

            body.append(title, value, date, description);

            const unit = String(metric.unit || "").toLowerCase();
            const numericValue = Number(metric.metricValue);
            if ((unit === "percent" || unit === "%") &&
                Number.isFinite(numericValue) && numericValue >= 0) {
                const progress = document.createElement("div");
                progress.className = "progress mt-3";
                progress.setAttribute("role", "progressbar");
                progress.setAttribute("aria-label", metric.metricName || "Metric percentage");
                progress.setAttribute("aria-valuemin", "0");
                progress.setAttribute("aria-valuemax", "100");
                progress.setAttribute("aria-valuenow", String(Math.min(numericValue, 100)));

                const bar = document.createElement("div");
                bar.className = "progress-bar bg-success";
                bar.style.width = `${Math.min(numericValue, 100)}%`;
                bar.textContent = `${formatNumber(numericValue)}%`;
                progress.appendChild(bar);
                body.appendChild(progress);
            }

            card.appendChild(body);
            column.appendChild(card);
            grid.appendChild(column);
        });

        container.appendChild(grid);
        const note = document.createElement("p");
        note.className = "small text-muted mt-3 mb-0";
        note.textContent = "These values are loaded from the sustainability_metrics table in MySQL.";
        container.appendChild(note);
    } catch (error) {
        showMessage(
            `${error.message} Check that the Java backend is deployed, the API URL is configured, and the database is reachable.`,
            "danger"
        );
    }
});
