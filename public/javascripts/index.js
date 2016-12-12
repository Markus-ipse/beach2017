var $ = document.getElementById.bind(document);
function lsGet(key) {
    var val = localStorage.getItem(key);
    if (val === null) return null;
    return JSON.parse(val);
}

var el = {
    beachFactor: $('js-beach-factor'),
    btnGlutton: $('js-glutton'),
    btnBeach: $('js-beach'),
    btnReset: $('js-reset'),
    error: $('js-error'),
    label: $('js-label')
};

var _state = {
    glutton: lsGet('glutton') || 0,
    beach: lsGet('beach') || 0,
    displayAsPoints: lsGet('displayAsPoints')
};

function persist(state) {
    localStorage.setItem('glutton', state.glutton);
    localStorage.setItem('beach', state.beach);
    localStorage.setItem('displayAsPoints', state.displayAsPoints);
}

function calcBeachFactor(beach, glutton, displayAsPoints) {
    if (displayAsPoints) {
        return beach - glutton;
    }
    
    var beachFactor = Math.round(beach / glutton * 100) / 100;
    if (isNaN(beachFactor)) return '-';

    return beachFactor;
}

function render(state) {
    el.beachFactor.innerText = calcBeachFactor(state.beach, state.glutton, state.displayAsPoints);
    el.label.innerText = state.displayAsPoints ? "Beach points:" : "Beach factor:"
}

function update(state) {
    render(state);
    persist(state);
}

el.btnGlutton.addEventListener('click', function onGlutton() {
    _state.glutton++;
    update(_state);
});

el.btnBeach.addEventListener('click', function onBeach() {
    _state.beach++;
    update(_state);
});

el.btnReset.addEventListener('click', function onReset() {
    _state.glutton = 0;
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
