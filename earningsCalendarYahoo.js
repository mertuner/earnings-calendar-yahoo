const jsdom = require("jsdom");
const { getDays, localTimeFormatter, weekInMs, dateFormatter, delayer } = require("./timeHelper");


const { JSDOM } = jsdom;
const BASE_URL = 'https://finance.yahoo.com/calendar/earnings?day=';



class Earnings_Calendar_Yahoo {

    constructor(delay = null) {
        this.today = dateFormatter(new Date(localTimeFormatter));
        this.nextWeek = dateFormatter(new Date(localTimeFormatter + weekInMs));
        this.delay = delay;
    }

    // Fetches earnings on a spesific day
    fetchTheDay = async (day = this.today) => {

        // Sleep if applicable
        this.delay && await delayer(this.delay);

        try {
            const res = await JSDOM.fromURL(`${BASE_URL}${day}`, {
                runScripts: 'dangerously'
            })
            const companies = [];
            const table = res.window.document.querySelector("tbody");
            if (!table) {
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
                company.ticker = row.children[0].textContent;
                company.name = row.children[1].textContent;
                company.ect = row.children[2].textContent ? row.children[2].textContent : row.children[2].children[0].textContent;
                company.epsEstimate = row.children[3].textContent;
                company.suprise = row.children[5].textContent;
                companies.push(company);
            }
            return companies;
        } catch (error) {
            return new Error(error);
        }

    }

    // Fetches earnings on a spesific date range
    fetchDaysBetween = async (fromDate = this.today, toDate = this.nextWeek) => {
        try {
            const dates = getDays(fromDate, new Date(toDate));
            console.log(dates);
            const companies = [];
            for (let i = 0; i < dates.length; i++) {
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