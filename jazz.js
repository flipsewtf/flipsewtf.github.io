// SECTIONS
document.querySelectorAll("a[data-content]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const contentId = link.getAttribute("data-content");
        const activeContent = document.querySelector(".content.active");
        const newContent = document.getElementById(contentId);

        if (activeContent && activeContent !== newContent) {
            document.querySelectorAll("a[data-content]").forEach((a) => a.classList.remove("disabled"));
            link.classList.add("disabled");

            activeContent.classList.remove("fade-in");
            activeContent.classList.add("fade-out");

            setTimeout(() => {
                activeContent.style.display = "none";
                activeContent.classList.remove("active", "fade-out");

                newContent.style.display = "block";
                newContent.classList.add("active", "fade-in");
            }, 100);
        }
    });
});

document.querySelectorAll(".content").forEach((section, index) => {
    section.style.display = index === 0 ? "block" : "none";
    if (index === 0) section.classList.add("active", "fade-in");
});

// TOOLTIP
const commonOptions = {
    theme: "custom",
    followCursor: true,
    placement: "top", // Default placement
    touch: "hold",
    animation: "scale",
    arrow: tippy.roundArrow,
};

tippy("[data-tippy-content]", {
    ...commonOptions,
    content(reference) {
        return reference.getAttribute("data-tippy-content");
    },
});

// DARK MODE
const themeToggleButtons = document.querySelectorAll(".theme-toggle");
const bulbButton = document.querySelector(".bulb"); // Select the bulb button itself

themeToggleButtons.forEach((btn) => {
    const storedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const initialTooltipText = storedTheme === "dark" ? "Toggle light mode" : "Toggle dark mode";

    // Custom tooltip placement for dark mode button
    const isDarkModeButton = btn.classList.contains("bulb");

    tippy(btn, {
        ...commonOptions,
        content: initialTooltipText,
        placement: isDarkModeButton ? "left" : commonOptions.placement, // Left placement for dark mode button
        arrow: false,
    });

    if (storedTheme === "dark") {
        bulbButton.classList.replace("bulb-off", "bulb-on");
    } else {
        bulbButton.classList.replace("bulb-on", "bulb-off");
    }

    btn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "light" ? "dark" : "light";

        // Update the tooltip text dynamically when theme changes
        const tooltipText = targetTheme === "dark" ? "Toggle light mode" : "Toggle dark mode";
        btn._tippy.setContent(tooltipText);

        // Toggle dark/light theme
        document.documentElement.classList.add("theme-transition");
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);

        // Toggle between bulb-on and bulb-off classes (reversed)
        if (targetTheme === "dark") {
            bulbButton.classList.replace("bulb-off", "bulb-on");
        } else {
            bulbButton.classList.replace("bulb-on", "bulb-off");
        }

        setTimeout(function () {
            document.documentElement.classList.remove("theme-transition");
        }, 50);
    });
});

