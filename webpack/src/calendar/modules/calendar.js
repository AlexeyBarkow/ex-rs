require('../styles/calendar');
function getCalendar(name, days) {
    let htmlString =
    `
        <div class="calendar">
            <h2>${ name }</h2>
        </div>
    `;
    let div = document.createElement('div');
    div.innerHTML = htmlString;
    let daysWrapper = document.createElement('div');
    daysWrapper.className = 'days-wrapper';
    for (let day of days) {
        daysWrapper.appendChild(day);
    }
    div.children[0].appendChild(daysWrapper);
    return div.children[0];
}

module.hot.accept('../styles/calendar', function () {
    require('../styles/calendar');
});

module.exports = {
    getCalendar
}
