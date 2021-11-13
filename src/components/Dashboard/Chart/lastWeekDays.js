
const currentDay = new Date()
const today = currentDay.getDay()
const dayLimit = today === 0 ? 6 : today


const lastWeekDays = () => {
    const weekDays = []
    for(let i = 0; i< dayLimit; i++ ){
        let d = new Date()
        d.setDate(d.getDate() - i)

        //return today in string month/day/year format
        const result = ((day, month, year) => {
            return [month, day, year].join('/');
        })(d.getDate(), d.getMonth()+1, d.getFullYear());
        
        weekDays.push(result)
    }
    return weekDays.reverse()
}

export default lastWeekDays
