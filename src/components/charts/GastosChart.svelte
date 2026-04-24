<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    type ChartOptions,
  } from 'chart.js';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  interface GastoItem {
    pct:           number;
    eficacia_pct:  number;
    presupuesto_B: number;
    pagos_B:       number;
  }

  interface Props {
    gastos: {
      inversion?:      GastoItem;
      funcionamiento?: GastoItem;
      deuda?:          GastoItem;
    };
  }

  let { gastos }: Props = $props();

  let chartData = $derived(() => {
    const entries: { label: string; pct: number; color: string }[] = [
      { label: 'Inversión Social', pct: gastos.inversion?.pct     ?? 0, color: '#059669' },
      { label: 'Funcionamiento',   pct: gastos.funcionamiento?.pct ?? 0, color: '#1e3a8a' },
      { label: 'Pago de Deudas',   pct: gastos.deuda?.pct          ?? 0, color: '#d97706' },
    ].filter(e => e.pct > 0);

    return {
      labels: entries.map(e => e.label),
      datasets: [{
        label:           '% del presupuesto',
        data:            entries.map(e => e.pct),
        backgroundColor: entries.map(e => e.color),
        borderRadius:    8,
        borderSkipped:   false,
        barPercentage:   0.6,
      }],
    };
  });

  const options: ChartOptions<'bar'> = {
    indexAxis:           'y',
    responsive:          true,
    maintainAspectRatio: false,
    layout: { padding: { right: 30 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${(ctx.raw as number).toFixed(1)}% del gasto total`,
        },
        padding:   12,
        titleFont: { size: 14, family: 'DM Sans' },
        bodyFont:  { size: 13, family: 'DM Sans' },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max:         100,
        grid:        { color: '#f1f5f9' },
        ticks: {
          callback:  (v) => v + '%',
          font:      { family: 'DM Sans', size: 12 },
          padding:   8,
        },
      },
      y: {
        grid:  { display: false },
        ticks: {
          font:  { family: 'DM Sans', size: 13, weight: 600 },
          color: '#334155',
        },
      },
    },
  };
</script>

<div class="relative w-full h-64 lg:h-72">
  <Bar data={chartData()} {options} />
</div>