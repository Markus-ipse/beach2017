window.onerror = function(errorMsg, url, lineNumber, column, exception) {
    $("error").innerText = errorMsg + " - " + exception.toString();
};

var glutton = localStorage.getItem('glutton') || 0;
var beach = localStorage.getItem('beach') || 0;

function $(id) {
    return document.getElementById(id);
}

function persist() {
    localStorage.setItem('glutton', glutton);
    localStorage.setItem('beach', beach);
}

function render() {
    $('glutton-count').innerText = glutton;
    $('beach-count').innerText = beach;
    $('kd').innerText = Math.round(beach/glutton * 100) / 100;
}

function update() {
    render();
    persist();
}

$('glutton').addEventListener('click', function onGlutton() {
    glutton++;
    update();
});

$('beach').addEventListener('click', function onBeach() {
    beach++;
    update();
});

$('clear').addEventListener('click', function onClear() {
    glutton = 0;
    beach = 0;
    update();
});

render();


