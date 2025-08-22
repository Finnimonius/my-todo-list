const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Обработчик переключения темы
themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});