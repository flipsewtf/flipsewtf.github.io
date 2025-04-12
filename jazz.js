const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applySystemTheme(e) {
    const prefersDark = e.matches ?? mediaQuery.matches;
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
    }, 50);
}

// Apply the theme on page load
applySystemTheme(mediaQuery);

// Listen for system theme changes
if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", applySystemTheme);
} else if (mediaQuery.addListener) {
    mediaQuery.addListener(applySystemTheme); // Safari fallback
}
