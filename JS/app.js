document.addEventListener("DOMContentLoaded", () => {
    const onboardingForm = document.getElementById("onboardingForm");

    // ==========================================================================
    // ROUTE A: FORM SUBMISSION & LOCAL CONFIG STORAGE HANDLER
    // ==========================================================================
    if (onboardingForm) {
        onboardingForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop native page reload behaviors

            // Grab all input values out of your 6 onboarding preference inputs
            const tenantConfigState = {
                survey_max_rent: parseFloat(document.getElementById("maxRent").value),
                survey_desired_bedrooms: parseInt(document.getElementById("desiredBedrooms").value),
                survey_has_dependents: document.getElementById("hasDependents").checked,
                survey_has_pets: document.getElementById("hasPets").checked,
                survey_moving_reserves: parseFloat(document.getElementById("movingReserves").value),
                survey_target_geographies: [
                    document.getElementById("targetLocation1").value,
                    document.getElementById("targetLocation2").value,
                    document.getElementById("targetLocation3").value
                ].filter(val => val.trim() !== "") // Remove empty choices
            };

            // Lock the parameters directly to the browser local state storage dictionary
            localStorage.setItem("tenantConfigState", JSON.stringify(tenantConfigState));

            // Force direct client page transition routing to launch the dashboard screen
            window.location.href = "dashboard.html";
        });
    }

    // ==========================================================================
    // ROUTE B: DASHBOARD PARSING & STATE RENDER ENGINE
    // ==========================================================================
    const dashboardCheck = document.getElementById("aiRealityCheck");
    if (dashboardCheck) {
        // Read client storage dictionary back into local active cache memory
        const savedStateString = localStorage.getItem("tenantConfigState");
        
        if (!savedStateString) {
            // Safety exit router: if no survey exists, kick user back to setup page
            window.location.href = "index.html";
            return;
        }

        const activeState = JSON.parse(savedStateString);
        console.log("TenantShield Data State Engine Active:", activeState);
        
        // This is your UI anchor. In Phase 4, your AI Vision pipeline will replace 
        // this loading message with the live data output metrics.
    }
});
