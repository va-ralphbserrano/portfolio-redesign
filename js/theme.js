/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Check user's system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!selectedTheme) {
        document.body.classList.add(darkTheme)
        themeButton.classList.remove(iconTheme)
        localStorage.setItem('selected-theme', 'dark')
        localStorage.setItem('selected-icon', 'fa-moon')
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!selectedTheme) {
        if (e.matches) {
            document.body.classList.add(darkTheme)
            themeButton.classList.remove(iconTheme)
            localStorage.setItem('selected-theme', 'dark')
            localStorage.setItem('selected-icon', 'fa-moon')
        } else {
            document.body.classList.remove(darkTheme)
            themeButton.classList.add(iconTheme)
            localStorage.setItem('selected-theme', 'light')
            localStorage.setItem('selected-icon', 'fa-sun')
        }
    }
})
