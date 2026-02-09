/**
 * Convert an HTML string into a single HTMLElement.
 * Usage:
 *   const el = toHtmlElement(`<div><p>Hello</p></div>`);
 */
export function toHtmlElement(htmlString) {
    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    return template.content.firstElementChild;
}
