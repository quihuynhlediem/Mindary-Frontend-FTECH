import { Plugin } from 'chart.js';

const createYAxisIconPlugin = (emojiIcons: HTMLImageElement[]): Plugin => ({
  id: 'customYAxisIconPlugin',
  afterDraw(chart) {
    const yAxis = chart.scales['y'];
    const ctx = chart.ctx;

    yAxis.ticks.forEach((tick, index) => {
      const y = yAxis.getPixelForTick(index);
      const icon = emojiIcons[tick.value - 1]; // Adjust depending on tick format

      if (icon && icon.complete) {
        ctx.drawImage(icon, yAxis.right - 30, y - 10, 20, 20);
      }
    });
  }
});

export default createYAxisIconPlugin;