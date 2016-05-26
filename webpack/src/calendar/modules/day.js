require('../styles/day');
function getDay(name, desc, hours) {
    let htmlString =
    `
        <div class="day">
            <div class="head-container">
                <h4>${ name }</h4>
                <span class="day-desc">${ desc }</span>
            </div>
        </div>
    `;
    let div = document.createElement('div');
    div.innerHTML = htmlString;
    let wrapper = document.createElement('div');
    wrapper.className = 'day-wrapper';
    for (let hour of hours) {
        wrapper.appendChild(hour);
    }
    div.children[0].appendChild(wrapper);
    return div.children[0];
}
module.exports = {
    getDay
}
