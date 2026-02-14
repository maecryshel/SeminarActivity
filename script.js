// Encapsulate script to avoid polluting global namespace
(function () {
    const list = document.getElementById('guest-list');

    // Load data on startup
    window.addEventListener('DOMContentLoaded', function() {
        const savedData = localStorage.getItem('guestbook_entries');
        if (savedData) {
            const entries = JSON.parse(savedData);
            entries.forEach(entry => renderEntry(entry.name, entry.learn));
        }
    });

    // Expose addEntry globally for the inline button onclick
    window.addEntry = function() {
        const name = document.getElementById('nameInput').value;
        const learn = document.getElementById('learnInput').value;

        if (name === '' || learn === '') {
            alert('Please fill in both fields!');
            return;
        }

        renderEntry(name, learn);
        saveToStorage(name, learn);

        document.getElementById('nameInput').value = '';
        document.getElementById('learnInput').value = '';
    };

    function renderEntry(name, learn) {
        const li = document.createElement('li');
        li.className = 'guest-entry';
        li.innerHTML = '<div class="guest-info"><strong>' + escapeHtml(name) + '</strong><span>Learned: ' + escapeHtml(learn) + '</span></div>';
        list.appendChild(li);
    }

    function saveToStorage(name, learn) {
        let entries = [];
        const savedData = localStorage.getItem('guestbook_entries');
        if (savedData) {
            entries = JSON.parse(savedData);
        }
        entries.push({ name: name, learn: learn });
        localStorage.setItem('guestbook_entries', JSON.stringify(entries));
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (s) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s];
        });
    }
})();
