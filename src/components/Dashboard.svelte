<script lang="ts">
  import { untrack }          from 'svelte';
  import IngresosChart        from './charts/IngresosChart.svelte';
  import GastosChart          from './charts/GastosChart.svelte';
  import ObrasSection         from './ui/ObrasSection.svelte';
  import ProveedoresSection   from './ui/ProveedoresSection.svelte';
  import Glosario             from './ui/Glosario.svelte';
  import Modal                from './ui/Modal.svelte';

  let { data } = $props<{
    data: {
      ciudad:   string;
      periodos: Record<string, any>;
    };
  }>();

  let keys = $derived(Object.keys(data.periodos).sort());

  // ✅ untrack: le dice a Svelte que sabemos que esto solo corre una vez
  // data es un prop estático que no cambia en runtime
  let periodoActual = $state(untrack(() => Object.keys(data.periodos).sort().at(-1) ?? ''));

  let periodo = $derived(periodoActual ? data.periodos[periodoActual] : null);
</script>

<!-- ── Selector sticky ─────────────────────────────────────────── -->
<div class="sticky-blur bg-navy/95 py-4 px-4 shadow-md border-b border-white/10 mb-10">
  <div class="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
    <span class="text-blue-100 text-sm md:text-base font-medium whitespace-nowrap">
      📅 Mirando el periodo:
    </span>
    <select
      bind:value={periodoActual}
      class="bg-white text-navy font-bold text-sm md:text-base py-2.5 px-5 rounded-xl shadow-sm
             focus:outline-none focus:ring-4 focus:ring-emerald/50 cursor-pointer w-full max-w-xs
             transition-all hover:shadow-lg"
    >
      {#each keys as k}
        <option value={k}>
          Año {k.split('-')[0]} — Semestre {k.split('-')[1]}
        </option>
      {/each}
    </select>
  </div>
</div>

<!-- ── Secciones ───────────────────────────────────────────────── -->
{#if periodo}
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex flex-col gap-10">

  <!-- Ingresos -->
  {#if periodo.ingresos}
    <section class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">

        <div class="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl">💰</span>
            <h2 class="text-2xl lg:text-3xl font-bold text-navy">¿De dónde viene la plata?</h2>
          </div>
          <p class="text-base text-slate-500 mb-8 leading-relaxed">
            El dinero llega de tres fuentes. Entender de dónde viene dice mucho sobre
            qué tan independiente es la ciudad.
          </p>
          <IngresosChart ingresos={periodo.ingresos} />
        </div>

        <!-- Leyenda dinámica desde items -->
        <div class="p-6 lg:p-10 bg-slate-50/30 flex flex-col justify-center space-y-4">
          {#each periodo.ingresos.items as item}
            {@const esNoTrib  = item.categoria.toLowerCase().includes('no tributario')}
            {@const esTrib    = item.categoria.toLowerCase().includes('tributario') && !esNoTrib}
            {@const bg        = esTrib ? 'bg-blue-50/80 border-blue-100'    : esNoTrib ? 'bg-emerald-50/80 border-emerald-100' : 'bg-white border-slate-200'}
            {@const dot       = esTrib ? 'bg-navy'                          : esNoTrib ? 'bg-emerald-500'                      : 'bg-slate-400'}
            {@const titleClr  = esTrib ? 'text-navy'                        : esNoTrib ? 'text-emerald-800'                    : 'text-slate-700'}
            <div class="flex gap-4 p-5 rounded-2xl border {bg} hover:brightness-95 transition-all">
              <div class="w-4 h-4 rounded-full {dot} mt-1 shrink-0 shadow-sm"></div>
              <div>
                <p class="text-base font-bold {titleClr}">{item.categoria}</p>
                <p class="text-sm text-slate-600 mt-1">
                  {item.pct_del_total.toFixed(1)}% del total ·
                  {item.eficiencia_recaudo_pct.toFixed(0)}% de eficiencia
                </p>
              </div>
            </div>
          {/each}
        </div>

      </div>
    </section>
  {/if}

  <!-- Gastos -->
  {#if periodo.gastos}
    <section class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">

        <div class="p-6 lg:p-10 order-2 lg:order-1 flex flex-col justify-center bg-slate-50/30">
          <Glosario />
        </div>

        <div class="p-6 lg:p-10 border-b lg:border-b-0 lg:border-l border-slate-100 order-1 lg:order-2 flex flex-col justify-center">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl">🏙️</span>
            <h2 class="text-2xl lg:text-3xl font-bold text-navy">¿En qué se gasta?</h2>
          </div>
          <p class="text-base text-slate-500 mb-8 leading-relaxed">
            El presupuesto se divide en tres grandes bolsillos que definen el rumbo de la ciudad.
          </p>
          <GastosChart gastos={periodo.gastos} />
        </div>

      </div>
    </section>
  {/if}

  <!-- Sin datos de ingresos/gastos -->
  {#if !periodo.ingresos && !periodo.gastos}
    <div class="bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-10 text-center">
      <p class="text-slate-400 text-base">Sin datos fiscales disponibles para este periodo.</p>
    </div>
  {/if}

  <!-- Obras -->
  <ObrasSection obras={periodo.obras} />

  <!-- Proveedores -->
  <ProveedoresSection proveedores={periodo.proveedores} />

</main>
{/if}

<Modal />