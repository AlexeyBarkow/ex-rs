require('./styles/index.css');
let Calendar = require('./modules/calendar'),
    Day = require('./modules/day'),
    Hour = require('./modules/hour');
const DAY_NAMES = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
function appendCalendarTo(daysObject, parentNode) {
    parentNode = parentNode || document.body;
    let days = [];
    for (let i = 0, hours; i < daysObject.length; i++) {
        hours = [];
        for (let j = 0, day; j < daysObject[i].eventArray.length; j++) {
            hours.push(Hour.getHour(daysObject[i].eventArray[j].hour, daysObject[i].eventArray[j].descs));
        }
        days.push(Day.getDay(DAY_NAMES[i], daysObject[i].date, hours));
    }
    let calendar = Calendar.getCalendar('My calendar', days);
    parentNode.appendChild(calendar);
    return calendar;
}
module.exports = {
    appendCalendarTo
}

module.hot.accept('./styles/index', () => {
    require('./styles/index')
});
