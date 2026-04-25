<script lang="ts">
  let abierto = $state(false);
</script>

<button
  onclick={() => abierto = true}
  class="fixed bottom-6 right-5 bg-navy hover:bg-blue-800 text-white rounded-full pl-4 pr-5 py-3
         shadow-xl flex items-center gap-2 text-sm font-medium transition-all hover:-translate-y-1 z-40
         focus:outline-none focus:ring-4 focus:ring-blue-300 border border-white/20"
>
  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
  Origen de los datos
</button>

{#if abierto}
  <div
    role="presentation"
    onclick={() => abierto = false}
    class="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
  >
    <dialog
      open
      aria-labelledby="modal-titulo"
      onclick={(e) => e.stopPropagation()}
      class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 relative animate-fade-up m-0 border-0"
    >
      <!-- Cerrar -->
      <button
        onclick={() => abierto = false}
        aria-label="Cerrar"
        class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center
               justify-center text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <h3 id="modal-titulo" class="text-xl font-bold text-navy mb-1 pr-8">
        🗂️ De dónde vienen los datos
      </h3>
      <p class="text-sm text-slate-400 mb-5">Fuentes oficiales del Estado colombiano</p>

      <!-- Fuente principal -->
      <div class="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 flex gap-3">
        <div class="text-2xl shrink-0">🏛️</div>
        <div>
          <p class="text-sm font-bold text-navy mb-0.5">Portal de Datos Abiertos</p>
          <p class="text-sm text-slate-600 leading-snug mb-2">
            Toda la información proviene de <strong>datos.gov.co</strong>, el portal
            oficial del Estado colombiano donde las entidades públicas publican su
            información de forma obligatoria.
          </p>
          <a
            href="https://datos.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            Ir a datos.gov.co
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Qué conjuntos se usan -->
      <p class="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2 px-1">Conjuntos utilizados</p>
      <ul class="flex flex-col gap-2 mb-5">
        {#each [
          { emoji: '💰', label: 'Ejecución de ingresos presupuestales' },
          { emoji: '🏙️', label: 'Ejecución de gastos presupuestales' },
          { emoji: '🚧', label: 'Seguimiento a proyectos de inversión' },
          { emoji: '⏳', label: 'Cuentas por pagar a proveedores' },
        ] as fuente}
          <li class="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
            <span class="text-base">{fuente.emoji}</span>
            {fuente.label}
          </li>
        {/each}
      </ul>

      <!-- Nota de transparencia -->
      <p class="text-xs text-slate-400 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
        Los datos se procesan y se preformatean para facilitar la lectura ciudadana.
        No se modifica ningún valor — solo se organiza y traduce a lenguaje simple.
      </p>
    </dialog>
  </div>
{/if}