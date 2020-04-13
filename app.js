const jsdom = require("jsdom");
const { getDays } =  require("./rangeHelper");


const { JSDOM } = jsdom;
const BASE_URL = 'https://finance.yahoo.com/calendar/earnings?day=';



class Earnings_Calendar_Yahoo {

    constructor(){
        this.today = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        this.nextWeek = new Date((new Date().getTime() - (new Date().getTimezoneOffset() * 60000)) + 604800000).toISOString().split('T')[0];
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

        fetchDaysBetween = async  (fromDate = this.today, toDate = this.nextWeek) => {
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