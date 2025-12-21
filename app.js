// 0FluffTally - Core Logic
let count = 0;
const STORAGE_KEY = '0fluff_tally_history';

const elements = {
    display: document.getElementById('display'),
    tallyBtn: document.getElementById('tally-btn'),
    stopBtn: document.getElementById('stop-btn'),
    resetBtn: document.getElementById('reset-btn'),
    nameInput: document.getElementById('counter-name'),
    notesInput: document.getElementById('counter-notes'),
    historyList: document.getElementById('history-list'),
    clearBtn: document.getElementById('clear-history')
};

// Initial Load
document.addEventListener('DOMContentLoaded', renderHistory);

// Tally Action
elements.tallyBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

// Reset Action
elements.resetBtn.addEventListener('click', () => {
    if (confirm('Reset current count?')) {
        count = 0;
        updateDisplay();
    }
});

// Stop & Save
elements.stopBtn.addEventListener('click', () => {
    if (count === 0) return alert("Nothing to save, Jacob.");

    const session = {
        id: Date.now(),
        name: elements.nameInput.value || "Untitled Counter",
        count: count,
        notes: elements.notesInput.value,
        date: new Date().toLocaleString()
    };

    saveSession(session);
    count = 0;
    elements.nameInput.value = '';
    elements.notesInput.value = '';
    updateDisplay();
    renderHistory();
});

elements.clearBtn.addEventListener('click', () => {
    if (confirm('Wipe all history?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
    }
});

function updateDisplay() {
    elements.display.innerText = count;
}

function saveSession(session) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    history.unshift(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    elements.historyList.innerHTML = history.map(item => `
        <div class="history-item">
            <strong>${item.name}</strong>: <span>${item.count} counts</span><br>
            <small style="color:var(--dim)">${item.date}</small>
            ${item.notes ? `<p style="margin:5px 0 0; font-size:0.9rem; opacity:0.8">${item.notes}</p>` : ''}
        </div>
    `).join('');
}
