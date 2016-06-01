let appender = require('./src/calendar/calendar-appender');


let daysObject = [
        {date: 'May, 23', eventArray: [ { hour: '12-00:', descs: ['Lorem', 'Ipsum'] }, { hour: '14-00:', descs: ['Inpsum'] } ] },
        {date: 'May, 24', eventArray: [] },
        {date: 'May, 25', eventArray: [ { hour: '11-00:', descs: ['Dolor'] } ] },
        {date: 'May, 26', eventArray: [ { hour: '18-00:', descs: ['Sit'] } ] },
        {date: 'May, 27', eventArray: [] },
        {date: 'May, 28', eventArray: [ { hour: '15-00:', descs: ['Amet'] } ] },
        {date: 'May, 29', eventArray: [] }
    ];
let calendar;


window.addEventListener('load', () => {
    calendar = appender.appendCalendarTo(daysObject, document.body);
});
if (module.hot) {
    module.hot.accept(['./src/calendar/calendar-appender', './src/calendar/modules/calendar', './src/calendar/modules/day', './src/calendar/modules/hour'], () => {
        calendar.parentElement.removeChild(calendar);
        appender = require('./src/calendar/calendar-appender');
        calendar = appender.appendCalendarTo(daysObject, document.body);
    });
}
