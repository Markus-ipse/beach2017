let glutton = localStorage.getItem('glutton') || 0;
let beach = localStorage.getItem('beach') || 0;

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

function onGlutton() {
    glutton++;
    render();
    persist()
}

function onBeach() {
    beach++;
    render();
    persist()
}

$('glutton').addEventListener('click', onGlutton);

$('beach').addEventListener('click', onBeach);

render();
