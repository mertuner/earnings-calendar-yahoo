exports.localTimeFormatter = new Date().getTime() - new Date().getTimezoneOffset() * 60000;
exports.weekInMs = 604800000;


// YYYY-MM-DD
exports.dateFormatter= d => {
    return d.toISOString().split('T')[0];
}


// Arrays of range of End - Start (Including End&Start Days)
exports.getDays = (startDay, endDay) => {
    const dates = [];
    for(let dt = new Date(startDay); dt <= endDay; dt.setDate(dt.getDate()+1)){
        dates.push(new Date(dt).toISOString().split('T')[0]);
    }
    return dates;
};

// Delay Function
exports.delayer = delay => new Promise(resolver => setTimeout(resolver, delay));
