const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const BASE_URL = 'https://finance.yahoo.com/calendar/earnings?day=';

const getDays = (startDay, endDay) => {
    const dates = [];
    for(let dt = new Date(startDay); dt <= endDay; dt.setDate(dt.getDate()+1)){
        dates.push(new Date(dt).toISOString().split('T')[0]);
    }
    return dates;
};

class Earnings_Calendar_Yahoo {

    constructor(){
        this.today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        this.nextWeek = new Date((date.getTime() - (date.getTimezoneOffset() * 60000)) + 604800000).toISOString().split('T')[0];
    }

    print = () => {
        console.log(this.today);
        console.log(this.nextWeek);
    }
    
    fetchTheDay = async (day = this.today) => {
            try {
                const res = await JSDOM.fromURL(`${BASE_URL}${day}`, {
                runScripts: 'dangerously'
            })
            
            const companies = [];
            const table = res.window.document.querySelector("tbody");
            if(!table){
                companies.push({
                    day: day,
                    dayMessage: 'No earnings on this day'
                })
                return companies;
            }
            for (let row of table.children) {
                let company = {
                    ticker: '',
                    name: '',
                    ect: '',
                    epsEstimate: '',
                    suprise: ''
                }
                company.ticker = row.children[0].children[0].textContent;
                company.name = row.children[1].textContent;
                company.ect = row.children[2].textContent ? row.children[2].textContent : row.children[2].children[0].textContent;
                company.epsEstimate = row.children[3].textContent;
                company.suprise = row.children[5].children[0].textContent;
                companies.push(company);
            }
                return companies;
            } catch (error) {
                throw new Error(error);
            }
            
        }

        fetchWeek = async  (fromDate = this.today, toDate = this.nextWeek) => {
            try {
                const dates = getDays(fromDate, new Date(toDate));
                console.log(dates);
                const companies = [];
                for(let i =0; i<dates.length; i++){
                    let currentDayData = await this.fetchTheDay(dates[i]);
                    companies.push(...currentDayData);
                }
                return companies;
            } catch (error) {
                return new Error(error);
            }
        }
}

module.exports = Earnings_Calendar_Yahoo;