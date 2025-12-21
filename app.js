let count = 0;

const nodes = {
    display: document.getElementById('display'),
    btn: document.getElementById('tally-btn'),
    save: document.getElementById('stop-btn'),
    history: document.getElementById('history-list'),
    name: document.getElementById('counter-name'),
    notes: document.getElementById('counter-notes')
};

// --- CORE ACTIONS ---
nodes.btn.onclick = () => {
    count++;
    nodes.display.innerText = count;
    TallyUI.animatePop(nodes.display);
    TallyUI.vibrate('light');
};

nodes.save.onclick = () => {
    if (count === 0) return TallyUI.showToast("Count is empty");

    const session = {
        id: Date.now(),
        name: nodes.name.value || "Untitled Session",
        val: count,
        note: nodes.notes.value,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    TallyStorage.save(session);
    resetSession();
    renderHistory();
    TallyUI.showToast("Log Saved");
};

function resetSession() {
    count = 0;
    nodes.display.innerText = "0";
    nodes.name.value = "";
    nodes.notes.value = "";
}

function renderHistory() {
    const data = TallyStorage.getAll();
    nodes.history.innerHTML = data.map(item => `
        <div class="history-item">
            <div style="display:flex; justify-content:space-between">
                <strong>${item.name}</strong>
                <span style="color:var(--accent)">${item.val}</span>
            </div>
            <p style="font-size:0.8rem; color:var(--dim); margin:4px 0">${item.note}</p>
        </div>
    `).join('');
}

// Initial Render
renderHistory();
