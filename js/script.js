const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const dialog = document.getElementById("dialog");
const noteBtn = document.getElementById("note-btn");

const cancelBtn = document.getElementById("modal-cancel");
const applyBtn = document.getElementById("modal-apply");
const modalInput = document.getElementById("modal-input");
const appNotes = document.getElementById("app-notes");

const appSelect = document.getElementById("app-select");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const displayNotes = (filter = "all") => {
    let filteredNotes = notes;
    if (filter === 'complete') {
        filteredNotes = notes.filter(note => note.completed);
    } else if (filter === 'incomplete') {
        filteredNotes = notes.filter(note => !note.completed);
    }

    appNotes.innerHTML = "";

    if (filteredNotes.length === 0) {
        const emptySvg = document.createElement("div");
        emptySvg.classList.add("empty-svg");
        appNotes.append(emptySvg);
        return
    }

    filteredNotes.forEach(note => {
        const index = notes.findIndex(n => n.text === note.text && n.completed === note.completed);
        appNotes.innerHTML += `<div class="note-box flex">
            <div class="note-wrap flex">
                <div class="cntr flex">
                    <input type="checkbox" id="cbx-${index}" class="hidden-xs-up" ${note.completed ? 'checked' : ''}>
                    <label for="cbx-${index}" class="cbx"></label>
                </div>
                <p class="descr note-descr" style="${note.completed ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${note.text}</p>
            </div>
            <div class="note-btn-wrap flex">
                <button class="edit-btn btn-reset">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </button>
                <button class="dlt-btn btn-reset"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD" />
                    <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" />
                    <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD" />
                    <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
                    <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </div>`;
    });
}

appNotes.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const index = parseInt(e.target.id.split('-')[1]);
        notes[index].completed = e.target.checked;
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes(appSelect.value);
    }
});

applyBtn.addEventListener("click", () => {
    const noteText = modalInput.value.trim();
    if (noteText) {
        notes.push({ text: noteText, completed: false });
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes(appSelect.value);
        modalInput.value = "";
        dialog.close();
    }
})

appSelect.addEventListener("change", (e) => {
    displayNotes(e.target.value)
})

// Switch theme
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

// Dialog 
noteBtn.addEventListener("click", () => {
    dialog.showModal()
})

cancelBtn.addEventListener("click", () => {
    dialog.close()
})

dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

displayNotes();