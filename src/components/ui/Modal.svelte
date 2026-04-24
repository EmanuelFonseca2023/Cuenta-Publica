<script lang="ts">
  let abierto = $state(false);
</script>

<button
  onclick={() => abierto = true}
  class="fixed bottom-6 right-5 bg-navy hover:bg-blue-800 text-white rounded-full pl-4 pr-5 py-3
         shadow-xl flex items-center gap-2 text-sm font-medium transition-all hover:-translate-y-1 z-40
         focus:outline-none focus:ring-4 focus:ring-blue-300 border border-white/20"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-up m-0 border-0"
    >
      <h3 id="modal-titulo" class="text-xl font-bold text-navy">
        De dónde vienen los datos
      </h3>
    </dialog>
  </div>
{/if}