const TallyUI = {
    animatePop: (el) => {
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 100);
    },
    vibrate: (type) => {
        if (navigator.vibrate) {
            type === 'light' ? navigator.vibrate(10) : navigator.vibrate([30, 50, 30]);
        }
    },
    showToast: (msg) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }
};
