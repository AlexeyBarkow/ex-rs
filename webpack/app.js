var appender = require('./src/calendar/calendar-appender');
// console.log("hello from app.js!");
// Calendar.hello();

var daysObject = [
        {date: 'May, 23', eventArray: [ { hour: '12-00:', descs: ['Lorem', 'Ipsum'] }, { hour: '14-00:', descs: ['Inpsum'] } ] },
        {date: 'May, 24', eventArray: [] },
        {date: 'May, 25', eventArray: [ { hour: '11-00:', descs: ['Dolor'] } ] },
        {date: 'May, 26', eventArray: [ { hour: '18-00:', descs: ['Sit'] } ] },
        {date: 'May, 27', eventArray: [] },
        {date: 'May, 28', eventArray: [ { hour: '15-00:', descs: ['Amet'] } ] },
        {date: 'May, 29', eventArray: [] }
    ];
// console.log(index);


module.hot.accept('./src/calendar/modules/calendar', function () {
    appender.appendCalendarTo(daysObject, document.body);
    appender = require('./src/calendar/calendar-appender');
    console.log('hereee');
});
window.addEventListener('load', () => {
    appender.appendCalendarTo(daysObject, document.body);
});
if (module.hot) {
    module.hot.accept();
}
