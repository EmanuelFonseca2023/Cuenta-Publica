# 📊 Cuenta Pública

Dashboard de transparencia y cuentas públicas con visualización de ingresos, gastos, obras y proveedores.

## ✨ Características

- **📈 Dashboards dinámicos**: Visualización interactiva de datos económicos
- **📉 Gráficos de análisis**: Gráficos de gastos e ingresos con Chart.js
- **🏗️ Sección de obras**: Información detallada de proyectos de infraestructura
- **🤝 Sección de proveedores**: Registro de proveedores y contratistas
- **📍 Multi-ciudad**: Soporte para múltiples ciudades (estructura base para Bucaramanga)
- **🎨 Interfaz moderna**: Construido con Tailwind CSS y Svelte para interactividad

## 🚀 Tecnología

- **[Astro](https://astro.build)** - Framework web moderno
- **[Svelte](https://svelte.dev)** - Componentes interactivos
- **[Tailwind CSS](https://tailwindcss.com)** - Estilos utility-first
- **[Chart.js](https://www.chartjs.org)** - Visualización de datos

## 📁 Estructura del Proyecto

```
/
├── public/                 # Activos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Dashboard.svelte      # Panel principal
│   │   ├── Hero.astro            # Sección hero
│   │   └── charts/               # Componentes de gráficos
│   │       ├── GastosChart.svelte
│   │       └── IngresosChart.svelte
│   │   └── ui/                   # Componentes UI
│   │       ├── Glosario.svelte
│   │       ├── Modal.svelte
│   │       ├── ObrasSection.svelte
│   │       └── ProveedoresSection.svelte
│   ├── data/              # Datos estáticos
│   │   └── bucaramanga.json
│   ├── layouts/           # Layouts de página
│   │   └── Base.astro
│   ├── pages/             # Rutas y páginas
│   │   ├── [ciudad].astro # Páginas dinámicas por ciudad
│   │   └── index.astro
│   └── styles/            # Estilos globales
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                       |
| :----------------------- | :------------------------------------------- |
| `npm install`            | Instala las dependencias                     |
| `npm run dev`            | Inicia servidor local en `localhost:4321`    |
| `npm run build`          | Construye el sitio para producción (`./dist/`) |
| `npm run preview`        | Previsualiza la compilación antes de desplegar |
| `npm run astro`          | Ejecuta comandos CLI de Astro                |

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Desarrollar localmente
npm run dev

# Compilar para producción
npm run build

# Ver previsualización
npm run preview
```

## 📚 Más información

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Svelte](https://svelte.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
