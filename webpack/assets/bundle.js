/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var {Calendar, Day, Hour} = __webpack_require__(1);
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
	        {date: 'May, 23', eventArray: [ { hour: '12', descs: ['Lorem', 'Ipsum'] }, { hour: '14', descs: ['Inpsum'] } ] },
	        {date: 'May, 24', eventArray: [] },
	        {date: 'May, 25', eventArray: [ { hour: '11', descs: ['Dolor'] } ] },
	        {date: 'May, 26', eventArray: [ { hour: '18', descs: ['Sit'] } ] },
	        {date: 'May, 27', eventArray: [] },
	        {date: 'May, 28', eventArray: [ { hour: '15', descs: ['Amet'] } ] },
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	
	module.exports = {
	    Calendar: __webpack_require__(6),
	    Day: __webpack_require__(9),
	    Hour: __webpack_require__(12)
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
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
	
	module.exports = {
	    getCalendar
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
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
	    wrapper.className = 'wrapper';
	    for (let hour of hours) {
	        wrapper.appendChild(hour);
	    }
	    div.children[0].children[0].appendChild(wrapper);
	    return div.children[0];
	}
	module.exports = {
	    getDay
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
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


/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map