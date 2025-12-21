const TallyStorage = {
    KEY: '0fluff_tally_v1',
    
    save(session) {
        const history = this.getAll();
        history.unshift(session);
        localStorage.setItem(this.KEY, JSON.stringify(history));
    },
    
    getAll() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    },
    
    clear() {
        localStorage.removeItem(this.KEY);
    }
};
