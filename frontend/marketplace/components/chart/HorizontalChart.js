import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Star } from '../../assets/icons'

const data = [ 1, 2, 3, 4 ,5 ]

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
}

// percentage(data, totalActivities)

// var totalValue = React.memo(() => {
//   percentage
// })

const HorizontalBarChart = ({profileReviews}) => {
  
const bars = data.map((item, i) => {
  var num = profileReviews.filter(data => data.rating === item)
  var total = percentage(num.length, profileReviews.length)

  return (
    <div className="flex my-2">
        <div className="grid grid-cols-2 text-lg pr-3">
            <Star className="my-auto w-[12px] h-[12px]"/>
            <span className="text-sm font-bold text-Black-medium" > {i + 1} </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 my-auto">
          <div class="bg-gray-600 h-2.5 rounded-full" style={{width: total}}></div>
        </div>
    </div>
  )});

  return (
    <div>
      {bars}
    </div>
  );
};

export default HorizontalBarChart;