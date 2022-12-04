require('moment-precise-range-plugin')
const moment = require('moment');
const EventEmitter = require('events');
const [ dateStringInFuture ] = process.argv.slice(2);
const DATE_FORMAT_PATTERN = 'HH-DD-MM-YYYY'

const getDateFromString = (dateString) => {
    const [ hour, day, mounth, year] = dateString.split('-');
    return new Date(Date.UTC(year, mounth - 1, day, hour));
}

const showRemaningTime = (dateInFuture) => {
    const dateNow = new Date();

    if (dateNow >= dateInFuture) {
        emitter.emit('timeEnd');
    } else {
        const currentDateFormatted = moment(dateNow, DATE_FORMAT_PATTERN);
        const futureDateFormatted = moment(dateStringInFuture, DATE_FORMAT_PATTERN);
        const diff = moment.preciseDiff(currentDateFormatted, futureDateFormatted);

        console.clear();
        console.log(diff);
    }
}

const showTimerDone = (timerId) => {
    clearInterval(timerId);
    console.log('Timer done');
}

const emitter = new EventEmitter();
const dateInFuture = getDateFromString(dateStringInFuture);
const timerId = setInterval(() => {
    emitter.emit('timerTick', dateInFuture);
}, 1000)
emitter.on('timerTick', showRemaningTime);
emitter.on('timeEnd', () => {
    showTimerDone(timerId);
});
