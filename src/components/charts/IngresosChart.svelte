<script lang="ts">
  import { Doughnut } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
  } from 'chart.js';

  ChartJS.register(ArcElement, Tooltip, Legend);

  interface IngresosItem {
    categoria: string;
    recaudo_B: number;
    presupuesto_B: number;
    eficiencia_recaudo_pct: number;
    pct_del_total: number;
  }

  interface Props {
    ingresos: {
      items: IngresosItem[];
      total_recaudo_B: number;
      analisis: string | null;
    };
  }

  let { ingresos }: Props = $props();

  // Orden importa: 'no tributario' debe evaluarse ANTES que 'tributario'
  const COLORES_MAP: { key: string; color: string }[] = [
    { key: 'no tributario',   color: '#059669' }, // emerald
    { key: 'tributario',      color: '#1e3a8a' }, // navy
    { key: 'sistema general', color: '#7c3aed' }, // violet
    { key: 'transferencia',   color: '#6366f1' }, // indigo
    { key: 'impuesto directo',color: '#d97706' }, // amber
  ];

  function colorFor(categoria: string): string {
    const lower = categoria.toLowerCase();
    for (const { key, color } of COLORES_MAP) {
      if (lower.includes(key)) return color;
    }
    return '#94a3b8'; // slate-400 fallback
  }

  let chartData = $derived({
    labels: ingresos.items.map(i => i.categoria),
    datasets: [{
      data:            ingresos.items.map(i => i.pct_del_total),
      backgroundColor: ingresos.items.map(i => colorFor(i.categoria)),
      borderWidth:     4,
      borderColor:     '#ffffff',
      hoverOffset:     8,
    }],
  });

  const options: ChartOptions<'doughnut'> = {
    responsive:          true,
    maintainAspectRatio: false,
    layout:  { padding: 10 },
    cutout:  '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font:    { size: 12, family: 'DM Sans', weight: 500 },
          padding: 16,
          usePointStyle: true,
          pointStyle:    'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${(ctx.raw as number).toFixed(1)}% del total`,
        },
        padding:   12,
        titleFont: { size: 14, family: 'DM Sans' },
        bodyFont:  { size: 13, family: 'DM Sans' },
      },
    },
  };
</script>

<div class="relative w-full h-64 lg:h-72">
  <Doughnut data={chartData} {options} />
</div>