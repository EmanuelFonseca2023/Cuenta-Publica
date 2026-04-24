<script lang="ts">
  interface ProveedorItem {
    servicio:           string;
    facturado_millones: number;
    pagado_millones:    number;
    deuda_millones:     number;
    mora_pct:           number;
  }

  interface Props {
    proveedores: {
      items:                      ProveedorItem[];
      total_deuda_top5_millones:  number;
      total_registros_con_mora:   number;
      analisis:                   string | null;
    };
  }

  let { proveedores }: Props = $props();

  const ICONS = ['🏫', '🏥', '🛣️', '💡', '🌳', '📋'];
</script>

<section class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-10">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

    <!-- Descripción -->
    <div class="lg:col-span-5 flex flex-col">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">⏳</span>
        <h2 class="text-2xl lg:text-3xl font-bold text-navy">Lo que se debe pero no se ha pagado</h2>
      </div>
      <p class="text-base text-slate-500 mb-4 leading-relaxed">
        La alcaldía ya recibió el servicio — el colegio dio clases, el médico atendió
        pacientes — pero todavía no ha girado el dinero al proveedor. Esto se llama
        <strong>mora en pagos</strong>.
      </p>

      <!-- Total deuda -->
      <div class="bg-amber-50 rounded-2xl p-5 border border-amber-100 mb-4">
        <p class="text-xs text-amber-600 uppercase tracking-wider font-bold mb-1">Total deuda (top registros)</p>
        <p class="text-3xl font-bold text-amber-700">
          ${proveedores.total_deuda_top5_millones.toLocaleString('es-CO')} M
        </p>
        <p class="text-sm text-amber-600 mt-1">
          en {proveedores.total_registros_con_mora} registros con mora
        </p>
      </div>

      <p class="text-sm text-slate-500 mt-auto leading-relaxed italic p-5 bg-slate-50 rounded-2xl border border-slate-100">
        Cada peso pendiente es un sueldo que un profesor, una enfermera o un
        contratista aún no ha recibido por un trabajo que ya hizo.
      </p>
    </div>

    <!-- Cards -->
    <div class="lg:col-span-7">
      {#if proveedores.items.length === 0}
        <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-base font-bold text-emerald-800 flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          Sin deudas destacadas este semestre
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each proveedores.items as item, i}
            <div class="card-hover bg-white border border-amber-200 rounded-2xl p-6 border-t-4 border-t-amber-500 shadow-sm flex flex-col h-full">
              <div class="flex items-start gap-3 mb-4">
                <div class="p-2 bg-amber-50 rounded-lg text-xl shrink-0">{ICONS[i % ICONS.length]}</div>
                <p class="text-sm font-bold text-navy leading-snug mt-1">{item.servicio}</p>
              </div>

              <div class="mt-auto">
                <p class="text-3xl font-bold text-amber-600 tracking-tight">
                  ${item.deuda_millones.toLocaleString('es-CO')}
                </p>
                <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">millones sin pagar</p>
                <div class="mt-3 flex justify-between text-xs text-slate-400">
                  <span>Facturado: ${item.facturado_millones.toLocaleString('es-CO')} M</span>
                  <span class="text-red-500 font-bold">{item.mora_pct.toFixed(0)}% mora</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if proveedores.analisis}
        <p class="text-sm text-slate-500 italic mt-4 px-1 leading-relaxed">{proveedores.analisis}</p>
      {/if}
    </div>

  </div>
</section>
