var $ = document.getElementById.bind(document);

var glutton = localStorage.getItem('glutton') || 0;
var beach = localStorage.getItem('beach') || 0;

var elGluttonCount = $('js-glutton-count');
var elBeachCount = $('js-beach-count');
var elBeachFactor = $('js-beach-factor');

function persist() {
    localStorage.setItem('glutton', glutton);
    localStorage.setItem('beach', beach);
}

function calcBeachFactor(_beach, _glutton) {
    var beachFactor = Math.round(_beach / _glutton * 100) / 100;
    if (isNaN(beachFactor)) return '-';

    return beachFactor;
}
function render() {
    elGluttonCount.innerText = glutton;
    elBeachCount.innerText = beach;
    elBeachFactor.innerText = calcBeachFactor(beach, glutton);
}

function update() {
    render();
    persist();
}

$('js-glutton').addEventListener('click', function onGlutton() {
    glutton++;
    update();
});

$('js-beach').addEventListener('click', function onBeach() {
    beach++;
    update();
});

$('js-clear').addEventListener('click', function onClear() {
    glutton = 0;
    beach = 0;
    update();
});

render();


window.onerror = function(errorMsg) {
    $("js-error").innerText = errorMsg;
};
