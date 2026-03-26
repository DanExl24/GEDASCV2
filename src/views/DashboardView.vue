<template>
  <!-- Contenedor principal de toda la vista -->
  <section class="bg-[#f4f9f4] min-h-screen flex flex-col">

    <!-- Header reutilizable -->
    <HeaderView />

    <!-- Contenido principal centrado -->
    <main class="flex-1 max-w-4xl w-full mx-auto px-6 py-5 flex flex-col gap-5">

      <!-- Banner superior con info del sistema + reloj en tiempo real -->
      <div class="!bg-verdeSena rounded-2xl px-6 py-5 flex items-center justify-between">
        <div>
          <!-- Texto descriptivo -->
          <p class="text-white/70 text-[11px] font-semibold uppercase tracking-widest mb-1">
            Bienvenido al sistema
          </p>
          <h1 class="text-white text-lg font-bold font-robotoSlab leading-snug">
            Control de Entradas y Salidas
          </h1>
          <p class="text-white/70 text-xs mt-1">
            Registra el acceso de aprendices, equipos y vehículos al CTA.
          </p>
        </div>

        <!-- Reloj dinámico -->
        <div class="text-right flex-shrink-0">
          <p class="text-white text-3xl font-bold font-quicksand leading-none">
            {{ horaActual }}
          </p>
          <p class="text-white/80 text-[11px] font-quicksand hidden sm:block">
            {{ fechaActual }}
          </p>
        </div>
      </div>

      <!-- Sección de estadísticas dinámicas -->
      <div>
        <p class="text-[11px] font-bold uppercase tracking-widest text-[#6b8a6b] mb-2">
          Resumen del día
        </p>

        <!-- Renderizado dinámico de stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-white rounded-xl border border-[#daeeda] px-4 py-3 flex flex-col gap-2">

            <!-- Encabezado de cada stat -->
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#6b8a6b] font-medium">
                {{ stat.label }}
              </span>

              <!-- Icono dinámico -->
              <div class="w-7 h-7 rounded-lg bg-[#f0f7f1] border flex items-center justify-center text-sm">
                {{ stat.icon }}
              </div>
            </div>

            <!-- Valor principal -->
            <p class="text-2xl font-bold leading-none"
              :class="stat.valueColor ?? 'text-[#1a2e1a]'">
              {{ stat.value }}
            </p>

            <!-- Tendencia -->
            <p class="text-[11px] font-medium"
              :class="stat.trendColor ?? 'text-verdeSena'">
              {{ stat.trend }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tarjetas principales de navegación -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <!-- Card: Registro -->
        <BaseCard
          view-link="/general-entry"
          :card-img="registerPerson"
          card-label="Registro"
          card-title="Registrar Entrada"
          card-text="Ingresa aprendices, equipos o vehículos al CTA."
          cta-text="Ir a Registro"
          variant="green"
        />

        <!-- Card: Salidas -->
        <BaseCard
          view-link="/general-exit"
          :card-img="ExitDoor"
          card-label="Salidas"
          card-title="Registrar Salida"
          card-text="Registra la salida de aprendices que dejan el CTA."
          cta-text="Ver Salidas"
          variant="orange"
        />

        <!-- Card: Historial -->
        <BaseCard
          view-link="/general-history"
          :card-img="RecordPaper"
          card-label="Historial"
          card-title="Historial General"
          card-text="Consulta el registro histórico completo del CTA."
          cta-text="Ver Historial"
          variant="blue"
        />
      </div>

      <!-- Sección inferior -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

        <!-- Actividad reciente (dinámica desde backend) -->
        <div class="bg-white rounded-2xl border overflow-hidden">
          <div class="px-4 py-3 border-b flex justify-between">
            <span class="text-sm font-bold">Actividad reciente</span>
            <span class="bg-[#f0f7f1] text-verdeSena text-[10px] px-2.5 py-1 rounded-full">
              Hoy
            </span>
          </div>

          <!-- Lista dinámica -->
          <div class="px-4 py-3 flex flex-col gap-3">
            <div v-for="item in activity" :key="item.nombre" class="flex items-center gap-3">

              <!-- Indicador visual entrada/salida -->
              <div class="w-2 h-2 rounded-full"
                :class="item.tipo === 'entrada' ? 'bg-verdeSena' : 'bg-orange-400'"/>

              <!-- Información -->
              <div class="flex-1">
                <p class="text-xs font-semibold">{{ item.nombre }}</p>

                <!-- Tiempo dinámico -->
                <p v-if="item.tiempo == 0">Justo Ahora</p>
                <p v-else>Hace {{ item.tiempo }} Min</p>
              </div>

              <!-- Badge tipo -->
              <span
                :class="item.tipo === 'entrada'
                  ? 'bg-[#f0f7f1] text-[#27500a]'
                  : 'bg-orange-50 text-orange-700'">
                {{ item.tipo === 'entrada' ? 'Entrada' : 'Salida' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Tips estáticos -->
        <div class="bg-white rounded-2xl border overflow-hidden">
          <div class="px-4 py-3 border-b">
            <span class="text-sm font-bold">Acceso rápido</span>
          </div>

          <div class="px-4 py-3 flex flex-col gap-3">
            <div v-for="tip in tips" :key="tip" class="flex items-start gap-3">
              <div class="w-6 h-6 flex items-center justify-center text-verdeSena">
                →
              </div>
              <p class="text-xs">{{ tip }}</p>
            </div>
          </div>
        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer class="bg-verdeSena text-white/70 text-[11px] text-center py-2 mt-auto">
      SENA · Centro de Tecnología y Automatización — Sistema CTA v2.0
    </footer>

  </section>
</template>

<script setup lang="ts">

// Imports principales de Vue
import { ref, onMounted, onUnmounted } from 'vue'

// Componentes reutilizables
import HeaderView from '@/layouts/HeaderView.vue'
import BaseCard from '@/components/Cards/BaseCard.vue'

// Recursos gráficos
import registerPerson from '@/assets/Icons/registerPersonGreen.png'
import ExitDoor from '@/assets/Icons/backOrange.png'
import RecordPaper from '@/assets/Icons/recordBlue.png'

// Funciones que traen datos (simulan backend o API)
import { getEstadisticas } from '@/constants/optionsStats'
import type { stat } from '@/constants/optionsStats'
import { getActivity } from '@/constants/optionsActivity'

// Estados reactivos
const stats = ref<stat[]>([])     // estadísticas del dashboard
const activity = ref()            // actividad reciente
const horaActual = ref('')        // hora en tiempo real
const fechaActual = ref('')       // fecha formateada

// Intervalos (para limpiarlos luego)
let intervalo: ReturnType<typeof setInterval>
let intervalData: ReturnType<typeof setInterval>

// Función que actualiza reloj cada segundo
const actualizarReloj = () => {
  const now = new Date()

  // Formato HH:mm
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  horaActual.value = `${h}:${m}`

  // Arrays para formateo manual de fecha
  const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

  fechaActual.value = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`
}

// Función que carga datos desde "backend"
const cargarDatos = async () => {
  stats.value = await getEstadisticas()
  activity.value = await getActivity()
}

// Hook: cuando el componente se monta
onMounted(async () => {

  // Primera carga de datos
  await cargarDatos()

  // Refresco automático de datos cada 5 segundos
  intervalData = setInterval(cargarDatos, 5000)

  // Inicializa reloj
  actualizarReloj()

  // Actualiza reloj cada segundo
  intervalo = setInterval(actualizarReloj, 1000)
})

// Hook: cuando el componente se destruye
onUnmounted(() => {

  // Limpieza de intervalos (CRÍTICO para evitar fugas de memoria)
  clearInterval(intervalo)
  clearInterval(intervalData)
})

// Tips estáticos (UX)
const tips = [
  'Usa el escáner de código de barras para registros rápidos.',
  'El ingreso manual está disponible si el código no escanea.',
  'El historial guarda todos los registros del mes con filtros.',
]

</script>
