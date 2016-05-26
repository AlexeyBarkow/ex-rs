require('./styles/index.css');
var Calendar = require('./modules/calendar'),
    Day = require('./modules/day'),
    Hour = require('./modules/hour');
// module.hot.accept('./styles/index.css', function () {
//     require('./styles/index.css')
// });
// console.log(module);
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
            // events.
            // for (let k = 0; k < daysObject[i].eventArray[j].descs.length; k++) {
            hours.push(Hour.getHour(daysObject[i].eventArray[j].hour, daysObject[i].eventArray[j].descs));
            // }
        }
        days.push(Day.getDay(DAY_NAMES[i], daysObject[i].date, hours));
    }
    parentNode.appendChild(Calendar.getCalendar('My calendar', days));
}
module.exports = {
    appendCalendarTo
}
