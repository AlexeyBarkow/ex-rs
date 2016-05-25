require('../styles/hour');
function getHour(number, events) {
    let htmlString =
    `
        <div class="hour">
            <span>${ number }</span>
            <ul><li>${ events.join('</li><li>') }</li></ul>
        </div>
    `;
    let div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.children[0];
}
module.exports = {
    getHour
}
