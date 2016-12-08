let glutton = localStorage.getItem('glutton') || 0;
let beach = localStorage.getItem('beach') || 0;

const $ = (id) => document.getElementById(id);

function persist() {
    localStorage.setItem('glutton', glutton);
    localStorage.setItem('beach', beach);
}

function render() {
    $('glutton-count').innerText = glutton;
    $('beach-count').innerText = beach;
    $('kd').innerText = Math.round(beach/glutton * 100) / 100;
}

$('glutton').addEventListener('click', () => {
    glutton++;
    render();
    persist()
});

$('beach').addEventListener('click', () => {
    beach++;
    render();
    persist()
});

render();
