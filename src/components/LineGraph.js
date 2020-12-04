import React from 'react'
import {Line} from 'react-chartjs-2'

import { isMobile } from "react-device-detect"

import * as moment from 'moment'


function LineGraph(props){

    const months = []
    const values = [0,0,0,0,0,0]
    moment.locale('en')

    var date = new Date()
    while(months.length < 6){
        months.unshift(moment(date).format("MMMM"))
        date = moment(date).subtract(1,"months")
    }

    Object.keys(props.MonthlyViews).map((item, i) => (
        months.forEach(function(month){
            if(month.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === item.toUpperCase()){
                values[months.indexOf(month)] = props.MonthlyViews[item]
                //console.log("valuesArray", values)
            }
        })
    ))

    const data = {
        labels: months,
        datasets: [
          {
            label: 'Views',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 20,
            data: values
          }
        ]
      }

    return (
        <div className="mt-4">
            {isMobile ?
            <Line data={data} height={320} options={{ maintainAspectRatio: false }} />
            :
            <Line data={data}/>
            }
        </div>
    )
}

export default LineGraph


