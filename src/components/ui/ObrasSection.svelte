<script lang="ts">
  interface ObraItem {
    nombre:            string;
    asignada_millones: number;
    girada_millones:   number;
    avance_pct:        number;
    sin_movimiento:    boolean;
  }

  interface Props {
    obras: {
      items:                ObraItem[];
      total_proyectos:      number;
      sin_movimiento_count: number;
      pct_sin_movimiento:   number;
      analisis:             string | null;
    };
  }

  let { obras }: Props = $props();
</script>

<section class="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-6 lg:p-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

    <!-- Descripción -->
    <div class="lg:col-span-5 flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <span class="text-4xl">🚧</span>
        <h2 class="text-2xl lg:text-3xl font-bold text-navy">Proyectos que avanzan (o no)</h2>
      </div>
      <p class="text-base text-slate-500 leading-relaxed">
        Que un proyecto tenga plata asignada no significa que ya se esté ejecutando.
        Aquí ves cuánto ha avanzado realmente cada uno.
      </p>

      <!-- Resumen estadístico -->
      <div class="flex gap-3">
        <div class="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
          <p class="text-2xl font-bold text-navy">{obras.total_proyectos}</p>
          <p class="text-xs text-slate-400 uppercase tracking-wider font-bold mt-1">Proyectos</p>
        </div>
        <div class="flex-1 bg-red-50 rounded-2xl p-4 border border-red-100 text-center">
          <p class="text-2xl font-bold text-red-600">{obras.sin_movimiento_count}</p>
          <p class="text-xs text-red-400 uppercase tracking-wider font-bold mt-1">Sin movimiento</p>
        </div>
        <div class="flex-1 bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
          <p class="text-2xl font-bold text-amber-600">{obras.pct_sin_movimiento.toFixed(0)}%</p>
          <p class="text-xs text-amber-500 uppercase tracking-wider font-bold mt-1">Paralizados</p>
        </div>
      </div>

      <div class="p-4 sm:p-5 bg-amber-50 rounded-2xl border border-amber-100">
        <p class="text-sm text-amber-900 leading-relaxed">
          <strong>¿Por qué puede estar en 0%?</strong> A veces está atrapado en licitaciones
          o firmas de contrato. El problema es real igual: mientras eso pasa, el parque no
          se construye y la vía no se repara.
        </p>
      </div>
    </div>

    <!-- Cards de obras -->
    <div class="lg:col-span-7 flex flex-col gap-3">
      {#if obras.items.length === 0}
        <p class="text-sm text-slate-400 italic p-4">Sin proyectos destacados este semestre.</p>
      {:else}
        {#each obras.items as obra}
          {@const color = obra.avance_pct < 5 ? '#d97706' : '#059669'}
          <div class="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100">
            <div class="flex justify-between items-start gap-3 mb-3">
              <p class="text-sm sm:text-base font-bold text-navy leading-tight wrap-break-word min-w-0">
                {obra.nombre}
              </p>
              {#if obra.sin_movimiento}
                <span class="badge bg-red-100 text-red-700 border border-red-200 shrink-0 whitespace-nowrap">
                  Sin movimiento
                </span>
              {:else}
                <span class="badge bg-amber-100 text-amber-800 border border-amber-200 shrink-0 whitespace-nowrap">
                  {obra.avance_pct.toFixed(1)}% ejecutado
                </span>
              {/if}
            </div>
            <div class="flex justify-between text-xs sm:text-sm text-slate-500 mb-3">
              <span>Asignado: <strong class="text-slate-700">${obra.asignada_millones.toLocaleString('es-CO')} M</strong></span>
              <span>Girado: <strong class="text-slate-700">${obra.girada_millones.toLocaleString('es-CO')} M</strong></span>
            </div>
            <div class="bar-track">
              <div
                class="bar-fill"
                style="width: {Math.max(obra.avance_pct, obra.sin_movimiento ? 0 : 0.5)}%; background: {color}"
              ></div>
            </div>
          </div>
        {/each}
      {/if}

      {#if obras.analisis}
        <p class="text-sm text-slate-500 italic px-1 leading-relaxed">{obras.analisis}</p>
      {/if}
    </div>

  </div>
</section>