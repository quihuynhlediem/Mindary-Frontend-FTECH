// 'use client'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   // Plugin,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import loadEmojiIcons from '@/utils/loadEmojiIcons';
// import createYAxisIconPlugin from '@/plugins/customYAxisIconPlugin.ts';
// import { useEffect, useState } from 'react';

// interface BarChartProps {
//   emotionLevel: number[],
//   dateLabel: string[],
// }

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

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

// // Plugin to draw emoji icons on y-axis
// // const customYAxisIconPlugin: Plugin = {
// //   id: 'customYAxisIconPlugin',
// //   afterDraw(chart) {
// //     const yAxis = chart.scales['y'];
// //     // console.log(yAxis);
// //     const ctx = chart.ctx;
// //     // console.log(ctx);

// //     yAxis.ticks.forEach((tick, index) => {
// //       const y = yAxis.getPixelForTick(index);
// //       const icon = emojiIcons[tick.value - 1 as number];

// //       if (icon && icon.complete) {
// //         ctx.drawImage(icon, yAxis.right - 30, y - 10, 20, 20); // Adjust position and size
// //       }
// //     });
// //   }
// // };

// const emojiPaths = [
//   '/bad-mood.svg',
//   '/not-good-mood.svg',
//   '/okay-mood.svg',
//   '/good-mood.svg',
//   '/great-mood.svg',
// ];

// export const options = {
//   responsive: true,
//   scales: {
//     y: {
//       min: 0,
//       max: 5,
//       ticks: {
//         display: true,
//         callback: (val: number) => val === 0 ? "No data" : "  " + val,

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

// // export const plugins = [customYAxisIconPlugin];

// const BarChart: React.FC<BarChartProps> = ({ dateLabel, emotionLevel }) => {
//   const [emojiIcons, setEmojiIcons] = useState<HTMLImageElement[] | null>(null);

//   useEffect(() => {
//     loadEmojiIcons(emojiPaths)
//       .then(setEmojiIcons)
//       .catch((err) => console.error('Error loading emoji icons:', err));
//   }, []);

//   if (!emojiIcons) return <p>Loading...</p>;

//   const plugins = [createYAxisIconPlugin(emojiIcons)];
//   return <Bar
//     options={options}
//     plugins={plugins}
//     data={{
//       labels: dateLabel, datasets: [
//         {
//           label: 'Emotion Level',
//           data: emotionLevel,
//           backgroundColor: (context: any) => {
//             const value = context.dataset.data[context.dataIndex];
//             // console.log(context.dataIndex, value);
//             switch (value) {
//               case 1:
//                 return "#F54336";
//               case 2:
//                 return "#FF981F";
//               case 3:
//                 return "#FFC02D";
//               case 4:
//                 return "#7EC8D3";
//               case 5:
//                 return "#00A5E3";
//             }
//           },
//           borderRadius: Number.MAX_VALUE
//         },]
//     }} />
// }

// export default BarChart;

'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Tick,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import loadEmojiIcons from '@/utils/loadEmojiIcons';
import createYAxisIconPlugin from '@/plugins/customYAxisIconPlugin.ts';
import { useEffect, useState } from 'react';

interface BarChartProps {
  emotionLevel: number[];
  dateLabel: string[];
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const emojiPaths = [
  '/bad-mood.svg',
  '/not-good-mood.svg',
  '/okay-mood.svg',
  '/good-mood.svg',
  '/great-mood.svg',
];

// Define the options with proper typing for a bar chart
export const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    y: {
      type: 'linear', // Explicitly specify the scale type
      min: 0,
      max: 5,
      ticks: {
        display: true,
        // Fix the callback type to match Chart.js expectations
        callback: (tickValue: number | string, index: number, ticks: Tick[]): string => {
          const value = Number(tickValue);
          return value === 0 ? 'No data' : '  ' + value;
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

const BarChart: React.FC<BarChartProps> = ({ dateLabel, emotionLevel }) => {
  const [emojiIcons, setEmojiIcons] = useState<HTMLImageElement[] | null>(null);

  useEffect(() => {
    loadEmojiIcons(emojiPaths)
      .then(setEmojiIcons)
      .catch((err) => console.error('Error loading emoji icons:', err));
  }, []);

  if (!emojiIcons) return <p>Loading...</p>;

  const plugins = [createYAxisIconPlugin(emojiIcons)];

  return (
    <Bar
      options={options}
      plugins={plugins}
      data={{
        labels: dateLabel,
        datasets: [
          {
            label: 'Emotion Level',
            data: emotionLevel,
            backgroundColor: (context: any) => {
              const value = context.dataset.data[context.dataIndex];
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
                  return '#000000'; // Fallback color
              }
            },
            borderRadius: Number.MAX_VALUE,
          },
        ],
      }}
    />
  );
};

export default BarChart;