// 'use client'
// import React from 'react';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   Plugin,
// } from 'chart.js';
// import { Scatter } from 'react-chartjs-2';
// import badMood from '/public/bad-mood.svg';
// import notGoodMood from '/public/not-good-mood.svg';
// import okayMood from '/public/okay-mood.svg';
// import goodMood from '/public/good-mood.svg';
// import greatMood from '/public/great-mood.svg';

// interface LineChartProps {
//   emotionLevel: number[],
//   dateLabel: string[],
// }

// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// // const emojiIcons = [
// //   new Image(),
// //   new Image(),
// //   new Image(),
// //   new Image(),
// //   new Image(),
// // ];

// // emojiIcons[0].src = '/bad-mood.svg';
// // emojiIcons[1].src = '/not-good-mood.svg';
// // emojiIcons[2].src = '/okay-mood.svg';
// // emojiIcons[3].src = '/good-mood.svg';
// // emojiIcons[4].src = '/great-mood.svg';

// const emojiIcons = [badMood, notGoodMood, okayMood, goodMood, greatMood];

// // Plugin to draw emoji icons on y-axis
// const customYAxisIconPlugin: Plugin = {
//   id: 'customYAxisIconPlugin',
//   afterDraw(chart) {
//     const yAxis = chart.scales['y'];
//     // console.log(yAxis);
//     const ctx = chart.ctx;
//     // console.log(ctx);

//     yAxis.ticks.forEach((tick, index) => {
//       const y = yAxis.getPixelForTick(index);
//       const icon = emojiIcons[tick.value - 1 as number];

//       if (icon && icon.complete) {
//         ctx.drawImage(icon, yAxis.right - 30, y - 10, 20, 20); // Adjust position and size
//       }
//     });
//   }
// };

// export const plugins = [customYAxisIconPlugin];

// export const options = {
//   responsive: true,
//   layouts: {
//     padding: 20,
//   },
//   scales: {
//     y: {
//       min: 0,
//       max: 6,
//       ticks: {
//         display: true,
//         callback: (val: number) => val === 0 ? "No data" : val === 6 ? "" : "  " + val,
//       },
//       grid: {
//         display: false,
//       }
//     },
//     x: {
//       grid: {
//         display: false,
//       }
//     }
//   },
//   plugins: {
//     legend: {
//       display: false
//     }
//   }
// };

// const LineChart: React.FC<LineChartProps> = ({ dateLabel, emotionLevel }) => {
//   return <Scatter className='w-[300px] h-[200px]' options={options} plugins={plugins} data={{
//     labels: dateLabel, datasets: [
//       {
//         label: 'Emotion Level',
//         data: emotionLevel,
//         backgroundColor: (context: any) => {
//           const value = context.dataset.data[context.dataIndex];
//           // console.log(context.dataIndex, value);
//           switch (value) {
//             case 1:
//               return "#F54336";
//             case 2:
//               return "#FF981F";
//             case 3:
//               return "#FFC02D";
//             case 4:
//               return "#7EC8D3";
//             case 5:
//               return "#00A5E3";
//             default:
//               return "#FFFFFF";
//           }
//         },
//       },]
//   }} />
// }

// export default LineChart;

'use client';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  Tick,
  Plugin,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import badMood from '/public/bad-mood.svg';
import notGoodMood from '/public/not-good-mood.svg';
import okayMood from '/public/okay-mood.svg';
import goodMood from '/public/good-mood.svg';
import greatMood from '/public/great-mood.svg';

interface LineChartProps {
  emotionLevel: number[];
  dateLabel: string[];
}

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const emojiIcons = [badMood, notGoodMood, okayMood, goodMood, greatMood];

// Plugin to draw emoji icons on y-axis
const customYAxisIconPlugin: Plugin = {
  id: 'customYAxisIconPlugin',
  afterDraw(chart) {
    const yAxis = chart.scales['y'];
    const ctx = chart.ctx;

    yAxis.ticks.forEach((tick, index) => {
      const y = yAxis.getPixelForTick(index);
      const iconIndex = tick.value - 1;
      const icon = emojiIcons[iconIndex >= 0 ? iconIndex : 0]; // Ensure index is valid

      if (icon && 'src' in icon && typeof icon.src === 'string') {
        const img = new Image();
        img.src = icon.src;
        if (img.complete) {
          ctx.drawImage(img, yAxis.right - 30, y - 10, 20, 20); // Adjust position and size
        }
      }
    });
  },
};

export const plugins = [customYAxisIconPlugin];

// Define the options with proper typing for a scatter chart
export const options: ChartOptions<'scatter'> = {
  responsive: true,
  layout: {
    padding: 20,
  },
  scales: {
    y: {
      type: 'linear', // Explicitly specify the scale type
      min: 0,
      max: 6,
      ticks: {
        display: true,
        // Fix the callback type to match Chart.js expectations
        callback: (tickValue: number | string, index: number, ticks: Tick[]): string => {
          const value = Number(tickValue);
          return value === 0 ? 'No data' : value === 6 ? '' : '  ' + value;
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineChart: React.FC<LineChartProps> = ({ dateLabel, emotionLevel }) => {
  return (
    <Scatter
      className="w-[300px] h-[200px]"
      options={options}
      plugins={plugins}
      data={{
        labels: dateLabel,
        datasets: [
          {
            label: 'Emotion Level',
            data: emotionLevel.map((value, index) => ({ x: index, y: value })), // Convert to scatter data format
            backgroundColor: (context: any) => {
              const value = context.dataset.data[context.dataIndex].y;
              switch (value) {
                case 1:
                  return '#F54336';
                case 2:
                  return '#FF981F';
                case 3:
                  return '#FFC02D';
                case 4:
                  return '#7EC8D3';
                case 5:
                  return '#00A5E3';
                default:
                  return '#FFFFFF';
              }
            },
            pointRadius: 5, // Ensure points are visible
            pointHoverRadius: 7, // Increase radius on hover
          },
        ],
      }}
    />
  );
};

export default LineChart;