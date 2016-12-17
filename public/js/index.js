if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function(reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function(error) {
        // registration failed
        console.error('Registration failed with ' + error);
    });
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(e) {
    console.log('beforeinstallprompt Event fired');
    e.preventDefault();

    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    return false;
});

function lsGet(key) {
    var val = localStorage.getItem(key);
    if (val === null) return null;
    return JSON.parse(val);
}

var $ = document.getElementById.bind(document);

var el = {
    beachFactor: $('js-beach-factor'),
    btnOmnomnom: $('js-omnomnom'),
    btnBeach: $('js-beach'),
    btnReset: $('js-reset'),
    error: $('js-error'),
    label: $('js-label')
};

var _state = {
    omnomnom: lsGet('omnomnom') || 0,
    beach: lsGet('beach') || 0,
    displayAsPoints: lsGet('displayAsPoints') || true
};

function persist(state) {
    localStorage.setItem('omnomnom', state.omnomnom);
    localStorage.setItem('beach', state.beach);
    localStorage.setItem('displayAsPoints', state.displayAsPoints);
}

function calcBeachFactor(beach, omnomnom, displayAsPoints) {
    if (displayAsPoints) {
        return beach - omnomnom;
    }
    
    var beachFactor = Math.round(beach / omnomnom * 100) / 100;
    if (isNaN(beachFactor)) return '-';

    return beachFactor;
}

function render(state) {
    el.beachFactor.innerText = calcBeachFactor(state.beach, state.omnomnom, state.displayAsPoints);
    el.label.innerText = state.displayAsPoints ? "Beach points:" : "Beach factor:"
}

function update(state) {
    render(state);
    persist(state);

    // show app install banner after three interactions
    if (deferredPrompt && (state.beach + state.omnomnom) > 2) {
        deferredPrompt.prompt();
        deferredPrompt = null;
    }
}

el.btnOmnomnom.addEventListener('click', function onOmnomnom() {
    _state.omnomnom++;
    update(_state);
});

el.btnBeach.addEventListener('click', function onBeach() {
    _state.beach++;
    update(_state);
});

el.btnReset.addEventListener('click', function onReset() {
    _state.omnomnom = 0;
    _state.beach = 0;
    update(_state);
});

el.beachFactor.addEventListener('click', function toggleDisplay() {
   _state.displayAsPoints = !_state.displayAsPoints;
    update(_state);
});

window.onerror = function(errorMsg) {
    el.error.innerText = errorMsg;
};

render(_state);
