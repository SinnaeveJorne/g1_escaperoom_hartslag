

const heardrange = ["90-100", "100-110", "110-120", "120-130", "130-140", "140-150", "150-160", "160-170", "170-180"];

const h = function() {
    const beer = document.querySelector('.beer-container');
const hartbeat = document.querySelector('.js-heartbeat');
const range = document.querySelector('.js-range');
    // Selecteer een willekeurige waarde uit de array
    const randomIndex = Math.floor(Math.random() * heardrange.length);
    const randomValue = heardrange[randomIndex];

    if (range) {
        // Stel de tekst in als het element gevonden is
        range.textContent = randomValue;
    } else {
        console.error('Element met class .js-range niet gevonden.');
    }
}

document.addEventListener('DOMContentLoaded', h);
