const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
    html.setAttribute("data-theme", "dark")
    themeToggle.checked = true
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        html.removeAttribute("data-theme", "dark")
        localStorage.setItem("theme", "light")
    }
}) 

const dialog = document.getElementById("dialog");
const noteBtn = document.getElementById("note-btn");

noteBtn.addEventListener("click", () => {
    dialog.showModal()
})