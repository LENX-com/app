import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Star } from '../../assets/icons'

const data = [ 1, 2, 3, 4 ,5 ]

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
}

// percentage(data, totalActivities)


const HorizontalBarChart = () => {
  
const bars = data.map((item, i) =>
    <div className="flex my-2">
        <div className="grid grid-cols-2 text-lg pr-3">
            <Star className="my-auto"/>
            <span className="text-sm font-bold text-Black-medium" > {item} </span>
        </div>
        <div key={i}
             className="bg-Black h- rounded-xl my-auto"
             style={{
              width: item*10, height: "6px"
             }}
          />
    </div>
  );
  return (
    <div>
      {bars}
    </div>
  );
};

export default HorizontalBarChart;