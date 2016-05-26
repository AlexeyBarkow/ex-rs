var {Calendar, Day, Hour} = require('./src/calendar/');
// console.log("hello from app.js!");
// Calendar.hello();
const DAY_NAMES = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
var daysObject = [
        {date: 'May, 23', eventArray: [ { hour: '12-00:', descs: ['Lorem', 'Ipsum'] }, { hour: '14-00:', descs: ['Inpsum'] } ] },
        {date: 'May, 24', eventArray: [] },
        {date: 'May, 25', eventArray: [ { hour: '11-00:', descs: ['Dolor'] } ] },
        {date: 'May, 26', eventArray: [ { hour: '18-00:', descs: ['Sit'] } ] },
        {date: 'May, 27', eventArray: [] },
        {date: 'May, 28', eventArray: [ { hour: '15-00:', descs: ['Amet'] } ] },
        {date: 'May, 29', eventArray: [] }
];

window.addEventListener('load', () => {
    // document.body.appendChild(newCa)
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
    document.body.appendChild(Calendar.getCalendar('My calendar', days));

});
