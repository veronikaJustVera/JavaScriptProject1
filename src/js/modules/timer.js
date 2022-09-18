/**
 * Set timer
 * @param {string} id - selector of parent block for timer
 * @param {string} deadline 
 */
const timer = (id, deadline) => {
    const getTimeRemaining = (endTime) => {
        const time = Date.parse(endTime) - Date.parse(new Date()),
              seconds = Math.floor(time / 1000 % 60),
              minutes = Math.floor(time / 1000 / 60 % 60),
              hours   = Math.floor(time / 1000 / 60 / 60 % 24),
              days    = Math.floor(time / 1000 / 60 / 60 / 24);

        return {
            'total'  : time,
            'days'   : days,
            'hours'  : hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endTime) => {
        const timer        = document.querySelector(selector),
              days         = timer.querySelector('#days'),
              hours        = timer.querySelector('#hours'),
              minutes      = timer.querySelector('#minutes'),
              seconds      = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const time = getTimeRemaining(endTime);

            days.textContent    = _formatDate(time.days);
            hours.textContent   = _formatDate(time.hours);
            minutes.textContent = _formatDate(time.minutes);
            seconds.textContent = _formatDate(time.seconds);

            if(time.total <= 0) {                
                days.textContent    = "00";
                hours.textContent   = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }
        updateClock();
    };
    /**
     * Format date:
     *  - add zero before number if it needs
     * @param {integer} dateValue - single value of time
     * @returns 
     */
        const _formatDate = (dateValue) => {
        return dateValue <= 9 ? ('0' + dateValue): dateValue 
    };

    setClock(id, deadline);
};
export default timer;