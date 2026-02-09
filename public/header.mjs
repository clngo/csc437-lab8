import { toHtmlElement } from "./toHtmlElement.mjs";

const navLinks = [
    { href: "index.html", label: "Home" },
    { href: "projects.html", label: "Projects" },
];

const navLinksHtml = navLinks
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join("");

const headerHtml = `<header id="site-header" class="site-header">
    <h1 class="site-title">Colin Ngo</h1>
    <nav class="site-nav" aria-label="Primary">
        ${navLinksHtml}
    </nav>
    <div class="site-controls">
        <label>
            <input type="checkbox" autocomplete="off" />
            Dark mode
        </label>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
            Menu
        </button>
    </div>
</header>`;

const headerElement = toHtmlElement(headerHtml);
const mount = document.querySelector("#site-header");

if (mount) {
    mount.replaceWith(headerElement);
} else {
    document.body.prepend(headerElement);
}

const menuButton = headerElement.querySelector(".menu-button");
const nav = headerElement.querySelector(".site-nav");
const darkModeCheckbox = headerElement.querySelector('input[type="checkbox"]');
const storageKey = "darkModeEnabled";

if (menuButton && nav) {
    nav.id = "site-nav";
    menuButton.addEventListener("click", () => {
        const isOpen = headerElement.classList.toggle("menu-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

document.body.addEventListener("click", (event) => {
    if (!headerElement.classList.contains("menu-open")) {
        return;
    }

    if (!headerElement.contains(event.target)) {
        headerElement.classList.remove("menu-open");
        menuButton?.setAttribute("aria-expanded", "false");
    }
});

if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        document.body.classList.toggle("dark-mode", isChecked);
        localStorage.setItem(storageKey, String(isChecked));
    });
}

const storedDarkMode = localStorage.getItem(storageKey);
const prefersDarkMode = storedDarkMode === "true";
if (prefersDarkMode) {
    document.body.classList.add("dark-mode");
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = true;
    }
}
