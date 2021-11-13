import React from "react";
import Chart from "react-google-charts";
import moment from "moment";
import lastWeekDays from "./lastWeekDays";
import { Grid } from '@material-ui/core'

const DashChart = (props) => {

    const { bills } = props
    const currentMonth = moment().month() 
    const lastWeek = lastWeekDays()

    // Monthly sales data
    const monthlySales = {}
    for(let i = currentMonth; i > currentMonth - 6; i--){
        let currentMonthSales = 0
        bills.forEach(bill => {
            if(moment(bill.date).month() === i){
                currentMonthSales += bill.total
            }
        })
        monthlySales[moment(i+1,'M').format('MMM')] = currentMonthSales
    }
    const salesData = Object.entries(monthlySales).reverse()
    salesData.unshift(['Month','Sales'])

    // weekly sales data
    const weeklySales = {}
    for(let i = 0; i < lastWeek.length; i++){
        let currentWeekSales = 0
        bills.forEach(bill => {
            if(lastWeek[i] === moment(bill.date).format('l')){
                currentWeekSales += bill.total 
            }
        })
        weeklySales[moment(lastWeek[i]).format('ddd')] = currentWeekSales
    }
    const weeklySalesData = Object.entries(weeklySales)
    weeklySalesData.unshift(['Day','Sales'])

    return(
        <div style = {{marginLeft:"60px"}}>
         <Grid container spacing={2} >
                      <Grid item xs={2} sm={6}  >
                        <Chart
                                width={560}
                                height={400}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={weeklySalesData}
                                options={{
                                    title: 'Current week sales'  ,
                                    chartArea: { width: '65%' },
                                    hAxis: { title: 'Days' },
                                    vAxis: { title: 'T o t a l  - S a l e s', minValue: 0 },
                                }}
                                legendToggle
        />
                          </Grid>

                          <Grid item xs={2} sm={4}  >
                          <Chart
                                    width={560}
                                    height={400}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Chart</div>}
                                    data={salesData}
                                    options={{
                                    title: 'Last six months sales',
                                    hAxis: { title: 'Months', titleTextStyle: { color: '#333' } },
                                    vAxis: { title: 'T o t a l  -  S a l e s',minValue: 0 },
                                    chartArea: { width: '65%', height: '70%' },
                                    }}
                                />
                          </Grid>
                     </Grid>
    </div>
    )
}

export default DashChart