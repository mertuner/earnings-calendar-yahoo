exports.getDays = (startDay, endDay) => {
    const dates = [];
    for(let dt = new Date(startDay); dt <= endDay; dt.setDate(dt.getDate()+1)){
        dates.push(new Date(dt).toISOString().split('T')[0]);
    }
    return dates;
};