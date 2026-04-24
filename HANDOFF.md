# Contexto: Migración "Cuenta Pública" — continuación

## Quién soy
Estudiante de ingeniería de sistemas, macOS, inicio carrera enero 2026.
Stack personal: Python, TypeScript, algo de Java, C++ y Rust.
Intereses futuros: HPC y computación cuántica.

---

## Qué es el proyecto

**Cuenta Pública** — civic tech de transparencia fiscal colombiana.
Dashboard que muestra de dónde viene y en qué se gasta el dinero público
de municipios colombianos, usando datos abiertos de datos.gov.co.

Empezamos con Bucaramanga + placeholders para Bogotá y Medellín.
Cada ciudad tiene su propio JSON en `src/data/`.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 6 (static output, sin SSR) |
| Islas interactivas | Svelte 5 (runes: $state, $derived, $effect, $props<T>()) |
| Gráficas | svelte-chartjs + chart.js |
| Estilos | Tailwind CSS v4 (tokens en @theme en global.css, sin tailwind.config) |
| Fuentes | Fraunces (display) + DM Sans (body) vía Google Fonts |
| Lenguaje | TypeScript strict |

---

## Estructura actual del proyecto

```
src/
├── components/
│   ├── Dashboard.svelte          ← isla principal (client:load)
│   ├── Hero.astro                ← header de página de ciudad
│   ├── charts/
│   │   ├── IngresosChart.svelte  ← doughnut (ingresos)
│   │   └── GastosChart.svelte    ← bar horizontal (gastos)
│   └── ui/
│       ├── ObrasSection.svelte   ← cards con barra de progreso
│       ├── ProveedoresSection.svelte ← cards de deuda amber
│       ├── Glosario.svelte       ← 3 botones + definición reactiva
│       └── Modal.svelte          ← botón flotante + overlay
├── data/
│   └── bucaramanga.json          ← datos reales (estructura abajo)
├── layouts/
│   └── Base.astro                ← shell HTML, importa global.css
├── pages/
│   ├── index.astro               ← landing, lista de ciudades
│   └── [ciudad].astro            ← ruta dinámica estática por ciudad
└── styles/
    └── global.css                ← @import tailwindcss + @theme tokens
```

---

## Tokens de diseño (global.css)

```css
@theme {
  --color-navy:    #1e3a8a;
  --color-emerald: #059669;
  --color-amber:   #d97706;
  --color-cream:   #faf7f2;
  --font-display:  'Fraunces', Georgia, serif;
  --font-body:     'DM Sans', sans-serif;
}
```

Clases custom importantes: `.badge`, `.bar-track`, `.bar-fill`,
`.card-hover`, `.sticky-blur`, `.animate-fade-up`, `.animate-fade-in`.

---

## Schema del JSON de ciudad

```json
{
  "ciudad": "bucaramanga",
  "periodos": {
    "2023-1": {
      "ingresos": {
        "items": [
          {
            "categoria": "Impuestos Tributarios",
            "recaudo_B": 0.12,
            "presupuesto_B": 0.15,
            "eficiencia_recaudo_pct": 80.0,
            "pct_del_total": 30.0
          }
        ],
        "total_recaudo_B": 0.40,
        "analisis": "string o null"
      },
      "gastos": {
        "inversion":      { "pct": 65.0, "eficacia_pct": 72.0, "presupuesto_B": 0.28, "pagos_B": 0.20 },
        "funcionamiento": { "pct": 22.0, "eficacia_pct": 90.0, "presupuesto_B": 0.09, "pagos_B": 0.08 },
        "deuda":          { "pct": 13.0, "eficacia_pct": 100.0,"presupuesto_B": 0.05, "pagos_B": 0.05 }
      },
      "obras": {
        "items": [
          {
            "nombre": "Infraestructura Vial Urbana",
            "asignada_millones": 34575.8,
            "girada_millones": 621.0,
            "avance_pct": 1.8,
            "sin_movimiento": false
          }
        ],
        "total_proyectos": 12,
        "sin_movimiento_count": 3,
        "pct_sin_movimiento": 25.0,
        "analisis": "string o null"
      },
      "proveedores": {
        "items": [
          {
            "servicio": "Servicio Educativo 201",
            "facturado_millones": 1200.0,
            "pagado_millones": 359.7,
            "deuda_millones": 840.3,
            "mora_pct": 70.0
          }
        ],
        "total_deuda_top5_millones": 841.6,
        "total_registros_con_mora": 4,
        "analisis": "string o null"
      }
    }
  }
}
```

Notas del schema:
- `ingresos` y `gastos` pueden ser `null` (algunos periodos no tienen datos).
- Unidades: `_B` = billones COP, `_millones` = millones COP, `_pct` = 0–100.
- Los porcentajes ya están normalizados, no recalcular.
- `periodos` van de `"2021-1"` a `"2024-2"` (formato `YYYY-S`).

---

## Decisiones técnicas importantes ya tomadas

1. **Svelte 5 runes** — usar siempre `$props<T>()` (genérico), NO `: T = $props()`.
2. **$derived para keys** — `Object.keys(data.periodos)` debe ser `$derived`, no `const`.
3. **Chart.js font weight** — siempre número (`500`, `600`), nunca string (`'500'`).
4. **ChartOptions tipado** — `const options: ChartOptions<'bar'>` / `ChartOptions<'doughnut'>`.
5. **Tailwind v4** — tokens en `@theme {}` en el CSS, sin `tailwind.config.mjs`.
6. **Agregar ciudad** — poner JSON en `src/data/`, importar en `[ciudad].astro`, añadir entrada al objeto `CIUDADES`.

---

## Estado actual

✅ Entorno configurado (Astro + Svelte + Tailwind + svelte-chartjs)
✅ global.css con tokens
✅ Base.astro (layout shell)
✅ Hero.astro (header de ciudad)
✅ index.astro (landing con selector de ciudades)
✅ [ciudad].astro (ruta dinámica estática)
✅ Dashboard.svelte (isla principal, sin errores TS ni Svelte)
✅ IngresosChart.svelte (doughnut)
✅ GastosChart.svelte (bar horizontal)
✅ ObrasSection.svelte
✅ ProveedoresSection.svelte
✅ Glosario.svelte
✅ Modal.svelte

---

## Lo que falta / posibles próximos pasos

- [ ] Probar `bucaramanga.json` ya tiene datos reales y todo eso pero esta actualmente sin probar realmente
- [ ] Revisar diseño visual en navegador y ajustar detalles
- [ ] Añadir página 404 custom
- [ ] Configurar `output: 'static'` en `astro.config.mjs` si se va a deployar
- [ ] Deploy (Vercel / Netlify / GitHub Pages)

---

## Lo que NO se debe tocar

- No hay base de datos ni backend. Todo es estático.
- No hay SSR. `getStaticPaths()` genera las rutas en build time.
- No usar `localStorage` ni APIs del browser fuera de islas Svelte.
