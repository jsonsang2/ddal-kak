document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '\u2600\uFE0F';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '\uD83C\uDF19';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '\u2600\uFE0F';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Lottery generator (only on index page)
    const generatorBtn = document.getElementById('generator-btn');
    const numbersContainer = document.getElementById('numbers-container');
    const historySection = document.getElementById('history-section');
    const historyList = document.getElementById('history-list');
    const history = [];

    if (generatorBtn && numbersContainer) {
        generatorBtn.addEventListener('click', () => {
            numbersContainer.innerHTML = '';
            const numbers = new Set();
            while (numbers.size < 6) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
            }

            const sorted = Array.from(numbers).sort((a, b) => a - b);

            sorted.forEach(num => {
                const el = document.createElement('div');
                el.classList.add('number');
                el.textContent = num;
                numbersContainer.appendChild(el);
            });

            // Save to history
            history.unshift(sorted.join(', '));
            if (history.length > 5) history.pop();
            renderHistory();
        });
    }

    function renderHistory() {
        if (!historyList || !historySection) return;
        historySection.classList.remove('hidden');
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }
});
