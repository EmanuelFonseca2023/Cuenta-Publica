# 📦 Especificación de Datos — `bucaramanga.json`

## 🎯 Propósito

Este documento define el contrato de datos del archivo `bucaramanga.json`, generado a partir de fuentes CSV de ejecución presupuestal del municipio.

Está diseñado para:

* Frontend (renderizado de dashboards / static pages)
* Generadores automáticos (IA, scripts, pipelines)
* Validación de estructura

---

# 🧭 1. Estructura Global

```json
{
  "ciudad": "string",
  "periodos": {
    "<periodo>": { ... }
  }
}
```

### 📌 Definiciones

* `ciudad`: identificador lógico del dataset
* `periodos`: diccionario indexado por periodo fiscal

---

# 📅 2. Periodos

Formato:

```text
YYYY-N
```

Ejemplos:

* `2023-1` → primer semestre 2023
* `2024-2` → segundo semestre 2024

⚠️ **No asumir orden** → iterar dinámicamente

---

# 🧱 3. Estructura por Periodo

```json
{
  "ingresos": { ... } | null,
  "gastos": { ... } | null,
  "obras": { ... },
  "proveedores": { ... }
}
```

---

# 💰 4. INGRESOS

```json
"ingresos": {
  "items": [
    {
      "categoria": "string",
      "recaudo_B": number,
      "presupuesto_B": number,
      "eficiencia_recaudo_pct": number,
      "pct_del_total": number
    }
  ],
  "total_recaudo_B": number,
  "analisis": string | null
}
```

### 📌 Semántica

| Campo                    | Descripción                         |
| ------------------------ | ----------------------------------- |
| `categoria`              | Tipo de ingreso                     |
| `recaudo_B`              | Valor recaudado (billones COP)      |
| `presupuesto_B`          | Presupuesto estimado (billones COP) |
| `eficiencia_recaudo_pct` | % ejecución                         |
| `pct_del_total`          | participación                       |

---

# 🏙️ 5. GASTOS

```json
"gastos": {
  "inversion": {
    "pct": number,
    "eficacia_pct": number,
    "presupuesto_B": number,
    "pagos_B": number
  },
  "funcionamiento": { ... },
  "deuda": { ... }
}
```

### 📌 Notas

* Campos pueden no existir
* `pct` → peso relativo
* `eficacia_pct` → ejecución real

---

# 🚧 6. OBRAS

```json
"obras": {
  "items": [
    {
      "nombre": "string",
      "asignada_millones": number,
      "girada_millones": number,
      "avance_pct": number,
      "sin_movimiento": boolean
    }
  ],
  "total_proyectos": number,
  "sin_movimiento_count": number,
  "pct_sin_movimiento": number,
  "analisis": string | null
}
```

### 📌 Reglas

* Solo Top 5 proyectos por presupuesto
* `sin_movimiento = avance_pct == 0`

---

# ⏳ 7. DEUDA A PROVEEDORES

```json
"proveedores": {
  "items": [
    {
      "servicio": "string",
      "facturado_millones": number,
      "pagado_millones": number,
      "deuda_millones": number,
      "mora_pct": number
    }
  ],
  "total_deuda_top5_millones": number,
  "total_registros_con_mora": number,
  "analisis": string | null
}
```

---

# 📏 8. Convenciones de Unidades

| Sufijo      | Unidad             |
| ----------- | ------------------ |
| `_B`        | Billones COP       |
| `_millones` | Millones COP       |
| `_pct`      | Porcentaje (0–100) |

---

# ⚠️ 9. Manejo de Nulls

```json
"ingresos": null
```

### Regla obligatoria:

```js
if (data.periodos[p].ingresos) {
  // render
}
```

---

# 🔁 10. Iteración Correcta

```js
Object.entries(data.periodos).forEach(([periodo, p]) => {
  console.log(periodo, p);
});
```

---

# 🧠 11. Valores Derivados (NO recalcular)

Estos campos ya vienen calculados:

* `pct_del_total`
* `eficiencia_recaudo_pct`
* `eficacia_pct`
* `mora_pct`

---

# 🎨 12. Reglas UI sugeridas

| Condición           | Interpretación       |
| ------------------- | -------------------- |
| `avance_pct == 0`   | Proyecto detenido 🔴 |
| `eficacia_pct < 30` | Baja ejecución ⚠️    |
| `mora_pct > 50`     | Alta deuda 🔴        |

---

# 🧪 13. Ejemplo Mínimo

```json
{
  "periodos": {
    "2024-1": {
      "ingresos": {
        "items": [
          {
            "categoria": "Impuestos",
            "recaudo_B": 472.8,
            "pct_del_total": 34.7
          }
        ]
      },
      "gastos": {
        "inversion": {
          "pct": 74.1,
          "eficacia_pct": 25.0
        }
      },
      "obras": {
        "items": [
          {
            "nombre": "Alumbrado Público",
            "avance_pct": 0,
            "sin_movimiento": true
          }
        ]
      }
    }
  }
}
```

---

# 🤖 14. Instrucciones para IA / Generadores

Una IA que consuma este JSON debe:

1. Iterar `periodos`
2. Validar nulls
3. Renderizar `items` como listas
4. Usar métricas existentes (no recalcular)
5. Respetar unidades
6. Priorizar visualización de:

   * obras
   * ejecución (gastos.inversion)
   * deuda

---

# 🚀 15. Resumen Ejecutivo

```text
- JSON jerárquico por periodo
- Datos agregados y listos para UI
- Métricas precalculadas
- Campos opcionales (null-safe)
- Optimizado para dashboards y static generation
```
