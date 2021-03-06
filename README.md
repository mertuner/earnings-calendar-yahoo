

> Scrapes earnings calendar data from Yahoo! Finance

## Install

```sh
npm install earnings-calendar-yahoo
```

##  Usage

### get today's earnings calendar

```javascript
const Earnings_Calendar_Yahoo = require('earnings-calendar-yahoo');
const earningsCalendarYahoo = new Earnings_Calendar_Yahoo();

earningsCalendarYahoo.fetchTheDay()
.then(res => console.log(res))
.catch(err => console.log(err)) 
```
##### returns
- `Promise` - Array of companies that have earning reports on today

### get earnings on a specific date
    
```javascript
const Earnings_Calendar_Yahoo = require('earnings-calendar-yahoo');
const earningsCalendarYahoo = new Earnings_Calendar_Yahoo();
    
// date format always should be 'YYYY-MM-DD'. No other Date format supported for now.
earningsCalendarYahoo.fetchTheDay('2020-04-07')
.then(res => console.log(res))
.catch(err => console.log(err)) 
```
##### parameters
- `day` (`string`) - 'YYYY-MM-DD' - By default it set to today

##### returns
- `Promise` - Array of companies that have earning reports on a specific day

### get earnings on a specific date range

```javascript
const Earnings_Calendar_Yahoo = require('earnings-calendar-yahoo');
const earningsCalendarYahoo = new Earnings_Calendar_Yahoo();
    
// date format always should be 'YYYY-MM-DD'. No other Date format supported for now.
    
earningsCalendarYahoo.fetchDaysBetween('2020-04-07', '2020-04-11')
.then(res => console.log(res))
.catch(err => console.log(err)) 
```
##### parameters
- `fromDate` (`string`) - 'YYYY-MM-DD' - By default it set to today
- `toDate` (`string`) - 'YYYY-MM-DD' - By default it set to 7 days ahead from today

##### returns
- `Promise` - Array of companies that have earning reports on a specific date range


### Set delay for consecutive requests
Delay can be set between requests. By default, it is null (No delay between requests). 

You can overwrite the default value by passing an argument to constructor

```javascript
const Earnings_Calendar_Yahoo = require('earnings-calendar-yahoo');

const delay = 2000;

earningsCalendarYahoo = new Earnings_Calendar_Yahoo(delay);

const sendMultipleRequests = async () => {
    const myArr = [];
    for(let i = 0; i<2; i++){
        const dayEarnings = await earningsCalendarYahoo.fetchTheDay();
        myArr.push(...dayEarnings);
    }
    console.log(myArr);
}

    sendMultipleRequests();
```

##### argument
- `delay` (`Number`) - delay factor in miliseconds


### Data attributes
- If no earning report on this day
    - day -- 'YYYY-MM-DD'
    - dayMessage: 'No earnings on this day''
- Otherwise
    - ticker -- Symbol (e.g, SBUX)
    - name -- Company Name (e.g, Starbucks)
    - ect -- Earnings Call Time (e.g, Before Market Open)
    - epsEstimate -- Earning Per Share Estimate (e.g, 0.63)
    - suprise -- Suprise Percentage (e.g +58.63)


## Author

--Mert Uner--
- Website: https://mertuner.web.app/
- LinkedIn: [@mertuner](https://linkedin.com/in/mertuner)
