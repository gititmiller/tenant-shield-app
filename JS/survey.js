document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("onboardingForm");
    if (!form) return;

    // Isolate our panels and navigation button triggers
    const panels = Array.from(form.querySelectorAll(".form-panel"));
    const prevBtn = document.getElementById("prevStepBtn");
    const nextBtn = document.getElementById("nextStepBtn");
    const launchBtn = document.getElementById("launchEngineBtn");
    const navDock = document.getElementById("surveyNavDock");

    let activePanelIndex = 0;

    // 1. Structural File Upload Success Feedback Handlers
    const leaseInput = document.getElementById("leaseUpload");
    const noticeInput = document.getElementById("noticeUpload");

    if (leaseInput) {
        leaseInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                const label = document.getElementById("leaseLabel");
                const text = document.getElementById("leaseText");
                const icon = document.getElementById("leaseIcon");
                label.style.borderColor = "#00b37e";
                label.style.backgroundColor = "rgba(0, 179, 126, 0.05)";
                text.innerText = `SUCCESS: ${e.target.files[0].name.substring(0, 20)}... LOADED`;
                icon.innerText = "✅";
                evaluatePanelValidity();
            }
        });
    }

    if (noticeInput) {
        noticeInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                const label = document.getElementById("noticeLabel");
                const text = document.getElementById("noticeText");
                const icon = document.getElementById("noticeIcon");
                label.style.borderColor = "#00b37e";
                label.style.backgroundColor = "rgba(0, 179, 126, 0.05)";
                text.innerText = `SUCCESS: ${e.target.files[0].name.substring(0, 20)}... LOADED`;
                icon.innerText = "✅";
                evaluatePanelValidity();
            }
        });
    }

    // 2. Real-Time Form Parameter Validation Check
    function evaluatePanelValidity() {
        const currentPanel = panels[activePanelIndex];
        const requiredInputs = currentPanel.querySelectorAll("input[required], select[required]");
        let isPanelValid = true;

        requiredInputs.forEach(input => {
            if (input.type === "file") {
                if (!input.files || input.files.length === 0) isPanelValid = false;
            } else {
                if (!input.value || input.value.trim() === "") isPanelValid = false;
            }
        });

        if (isPanelValid) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";
            nextBtn.style.cursor = "pointer";
        } else {
            nextBtn.disabled = true;
            nextBtn.style.opacity = "0.4";
            nextBtn.style.cursor = "not-allowed";
        }
    }

    // Listen across current panel items for data entries
    form.addEventListener("input", evaluatePanelValidity);
    form.addEventListener("change", evaluatePanelValidity);

    // 3. Multi-Step Chronological Display Timeline Engine
    function syncPanelTimelineDisplay() {
        panels.forEach((panel, index) => {
            if (index === activePanelIndex) {
                panel.style.display = "block";
                panel.style.opacity = "1";
            } else {
                panel.style.display = "none";
            }
        });

        // Hide back button if user is sitting on page 1
        if (activePanelIndex === 0) {
            prevBtn.style.visibility = "hidden";
        } else {
            prevBtn.style.visibility = "visible";
        }

        // Adjust navigation button text if jumping to uploads or verification screen
        if (activePanelIndex === panels.length - 2) {
            nextBtn.innerText = "Analyze Documents 🚀";
        } else if (activePanelIndex === panels.length - 1) {
            // Hide the standard navigation dock once verification checkpoint panel opens
            navDock.style.display = "none";
        } else {
            nextBtn.innerText = "Continue ➡️";
        }

        evaluatePanelValidity();
    }

    // Connect button click event actions
    nextBtn.addEventListener("click", () => {
        if (activePanelIndex < panels.length - 1) {
            activePanelIndex++;
            syncPanelTimelineDisplay();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (activePanelIndex > 0) {
            activePanelIndex--;
            syncPanelTimelineDisplay();
        }
    });

    // Initialize first display loop
    syncPanelTimelineDisplay();
});