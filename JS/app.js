document.addEventListener("DOMContentLoaded", () => {
    const onboardingForm = document.getElementById("onboardingForm");

    // ==========================================================================
    // MODULE A: SURVEY DATA ACQUISITION & CLIENT CACHE OVERLAY
    // ==========================================================================
    if (onboardingForm) {
        onboardingForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Intercept default browser page reload routing

            // Grab the precise unedited parameters from all survey input selectors
            const tenantConfigState = {
                survey_max_rent: parseFloat(document.getElementById("maxRent").value) || 0,
                survey_desired_bedrooms: parseInt(document.getElementById("desiredBedrooms").value) || 1,
                survey_has_dependents: document.getElementById("hasDependents").checked,
                survey_has_pets: document.getElementById("hasPets").checked,
                survey_moving_reserves: parseFloat(document.getElementById("movingReserves").value) || 0,
                survey_target_geographies: [
                    document.getElementById("targetLocation1").value,
                    document.getElementById("targetLocation2").value,
                    document.getElementById("targetLocation3").value
                ].filter(val => val.trim() !== "") // Purge empty optional input strings
            };

            // Lock this unified data dictionary directly into your device's localStorage
            localStorage.setItem("tenantConfigState", JSON.stringify(tenantConfigState));

            // Execute client routing switch to immediately shift screens to the dashboard
            window.location.href = "dashboard.html";
        });
    }

    // ==========================================================================
    // MODULE B: INTERACTIVE GRID RENDERER & METADATA BINDINGS
    // ==========================================================================
    const summaryContainer = document.getElementById("surveySummaryContainer");
    if (summaryContainer) {
        // Read client storage cache memory back into active javascript variables
        const cachedDataString = localStorage.getItem("tenantConfigState");

        if (!cachedDataString) {
            // Safety Protocol: If no survey configuration exists, route user back to page 1
            window.location.href = "index.html";
            return;
        }

        const activeState = JSON.parse(cachedDataString);
        console.log("TenantShield Data State Engine Synchronized:", activeState);

        // Dynamically overwrite your top-deck panel tags with the real metrics
        summaryContainer.innerHTML = `
            <p class="data-item"><strong>Max Allowed Rent:</strong> $${activeState.survey_max_rent.toLocaleString()}/mo</p>
            <p class="data-item"><strong>Beds Required:</strong> ${activeState.survey_desired_bedrooms} BR</p>
            <p class="data-item"><strong>Household Pets:</strong> ${activeState.survey_has_pets ? "🐾 Allowed" : "❌ None"}</p>
            <p class="data-item"><strong>Dependents:</strong> ${activeState.survey_has_dependents ? "🏫 Yes (School Mode)" : "❌ None"}</p>
            <p class="data-item"><strong>Moving Reserves:</strong> $${activeState.survey_moving_reserves.toLocaleString()}</p>
            <p class="data-item"><strong>Target Zones:</strong> ${activeState.survey_target_geographies.join(" | ") || "Fresno, CA"}</p>
        `;
    }
});