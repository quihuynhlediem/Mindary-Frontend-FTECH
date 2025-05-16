'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import badMood from '/public/bad-mood.svg';
import notGoodMood from '/public/not-good-mood.svg';
import okayMood from '/public/okay-mood.svg';
import goodMood from '/public/good-mood.svg';
import greatMood from '/public/great-mood.svg';

interface BarChartProps {
  emotionLevel: number[],
  dateLabel: string[],
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const emojiIcons = [badMood, notGoodMood, okayMood, goodMood, greatMood];

// Plugin to draw emoji icons on y-axis
const customYAxisIconPlugin: Plugin = {
  id: 'customYAxisIconPlugin',
  afterDraw(chart) {
    const yAxis = chart.scales['y'];
    // console.log(yAxis);
    const ctx = chart.ctx;
    // console.log(ctx);

    yAxis.ticks.forEach((tick, index) => {
      const y = yAxis.getPixelForTick(index);
      const icon = emojiIcons[tick.value - 1 as number];

      if (icon && icon.complete) {
        ctx.drawImage(icon, yAxis.right - 30, y - 10, 20, 20); // Adjust position and size
      }
    });
  }
};

export const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 5,
      ticks: {
        display: true,
        callback: (val: number) => val === 0 ? "No data" : "  " + val,

      },
      grid: {
        display: false,
      }
    },
    x: {
      grid: {
        display: false,
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

export const plugins = [customYAxisIconPlugin];

const BarChart: React.FC<BarChartProps> = ({ dateLabel, emotionLevel }) => {
  return <Bar options={options} plugins={plugins} data={{
    labels: dateLabel, datasets: [
      {
        label: 'Emotion Level',
        data: emotionLevel,
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          // console.log(context.dataIndex, value);
          switch (value) {
            case 1:
              return "#F54336";
            case 2:
              return "#FF981F";
            case 3:
              return "#FFC02D";
            case 4:
              return "#7EC8D3";
            case 5:
              return "#00A5E3";
          }
        },
        borderRadius: Number.MAX_VALUE
      },]
  }} />
}

export default BarChart;