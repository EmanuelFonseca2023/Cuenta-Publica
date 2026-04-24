<script lang="ts">
  type GlosarioKey = 'funcionamiento' | 'inversion' | 'deuda';

  let activo = $state<GlosarioKey>('inversion');

  const definiciones: Record<GlosarioKey, { titulo: string; emoji: string; texto: string; nota: string; notaColor: string }> = {
    funcionamiento: {
      titulo:     'Funcionamiento',
      emoji:      '⚙️',
      texto:      'Es lo que cuesta que la ciudad no se detenga hoy. Aquí están los salarios de los funcionarios públicos, el mantenimiento de las sedes de la alcaldía, los servicios públicos de los edificios institucionales y los contratos básicos de operación.',
      nota:       'Analogía: Es como el mercado mensual de una familia. Sin él nada funciona, pero tampoco hace crecer el hogar.',
      notaColor:  'text-slate-500',
    },
    inversion: {
      titulo:     'Inversión Social',
      emoji:      '🏗️',
      texto:      'Es la plata que sí transforma la ciudad. Se destina a construir o mejorar colegios, hospitales, parques, vías, acueductos y programas sociales. También cubre subsidios de salud y alimentación escolar.',
      nota:       'Un buen indicador: Que este porcentaje sea el mayor de los tres es señal de que la alcaldía no solo "sobrevive" sino que invierte en el futuro.',
      notaColor:  'text-emerald-700',
    },
    deuda: {
      titulo:     'Pago de Deudas',
      emoji:      '🏦',
      texto:      'A veces la ciudad pide préstamos para financiar obras grandes que no puede pagar de una sola vez. Este porcentaje es lo que se devuelve a los bancos en ese semestre: capital más intereses.',
      nota:       'Ojo: Cuando este porcentaje sube mucho, significa que la deuda pasada está "comiendo" plata que podría ir a nueva inversión.',
      notaColor:  'text-amber-700',
    },
  };

  const botones: { key: GlosarioKey; label: string; emoji: string; clases: string }[] = [
    { key: 'funcionamiento', label: 'Funcionamiento', emoji: '⚙️', clases: 'bg-blue-50 text-navy border-blue-100 hover:bg-blue-100 focus:ring-blue-300' },
    { key: 'inversion',      label: 'Inversión Social', emoji: '🏗️', clases: 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100 focus:ring-emerald-300' },
    { key: 'deuda',          label: 'Pago de Deudas', emoji: '🏦', clases: 'bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100 focus:ring-amber-300' },
  ];

  let def = $derived(definiciones[activo]);
</script>

<div>
  <h3 class="text-lg font-bold text-slate-700 mb-4">Toca un nombre para entender qué hay adentro:</h3>

  <div class="flex flex-wrap gap-3 mb-6">
    {#each botones as btn}
      <button
        onclick={() => activo = btn.key}
        class="px-5 py-2.5 text-sm font-bold rounded-xl border transition-all focus:ring-2 outline-none
               {btn.clases}
               {activo === btn.key ? 'ring-2 shadow-sm' : ''}"
      >
        {btn.emoji} {btn.label}
      </button>
    {/each}
  </div>

  <div class="p-6 rounded-2xl bg-white border border-slate-200 text-base text-slate-700 leading-relaxed shadow-sm min-h-40">
    <p class="font-bold mb-3">{def.emoji} {def.titulo}</p>
    <p class="mb-3">{def.texto}</p>
    <p class="text-sm italic {def.notaColor}">{def.nota}</p>
  </div>
</div>
