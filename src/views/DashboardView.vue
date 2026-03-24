<template>
  <section class="bg-[#f4f9f4] min-h-screen flex flex-col">

    <HeaderView />

    <main class="flex-1 max-w-4xl w-full mx-auto px-6 py-5 flex flex-col gap-5">

      <!-- Banner de bienvenida con reloj -->
      <div class="!bg-verdeSena rounded-2xl px-6 py-5 flex items-center justify-between">
        <div>
          <p class="text-white/70 text-[11px] font-semibold uppercase tracking-widest mb-1">Bienvenido al sistema</p>
          <h1 class="text-white text-lg font-bold font-robotoSlab leading-snug">Control de Entradas y Salidas</h1>
          <p class="text-white/70 text-xs mt-1">Registra el acceso de aprendices, equipos y vehículos al CTA.</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-white text-3xl font-bold font-quicksand leading-none">{{ horaActual }}</p>
          <p class="text-white/65 text-[11px] mt-1">{{ fechaActual }}</p>
        </div>
      </div>

      <!-- Estadísticas -->
      <div>
        <p class="text-[11px] font-bold uppercase tracking-widest text-[#6b8a6b] mb-2">Resumen del día</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-white rounded-xl border border-[#daeeda] px-4 py-3 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-[#6b8a6b] font-medium">{{ stat.label }}</span>
              <div class="w-7 h-7 rounded-lg bg-[#f0f7f1] border border-[#c5e0c5] flex items-center justify-center text-sm">
                {{ stat.icon }}
              </div>
            </div>
            <p class="text-2xl font-bold leading-none" :class="stat.valueColor ?? 'text-[#1a2e1a]'">{{ stat.value }}</p>
            <p class="text-[11px] font-medium" :class="stat.trendColor ?? 'text-verdeSena'">{{ stat.trend }}</p>
          </div>
        </div>
      </div>

      <!-- Vista principal -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <BaseCard
          view-link="/general-entry"
          :card-img="registerPerson"
          card-label="Registro"
          card-title="Registrar Entrada"
          card-text="Ingresa aprendices, equipos o vehículos al CTA."
          cta-text="Ir a Registro"
          variant="green"
        />
        <BaseCard
          view-link="/general-exit"
          :card-img="ExitDoor"
          card-label="Salidas"
          card-title="Registrar Salida"
          card-text="Registra la salida de aprendices que dejan el CTA."
          cta-text="Ver Salidas"
          variant="orange"
        />
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

      <!-- Fila inferior: actividad reciente + acceso rápido -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

        <!-- Actividad reciente -->
        <div class="bg-white rounded-2xl border border-[#daeeda] overflow-hidden">
          <div class="px-4 py-3 border-b border-[#f0f7f1] flex items-center justify-between">
            <span class="text-sm font-bold text-[#1a2e1a] font-robotoSlab">Actividad reciente</span>
            <span class="bg-[#f0f7f1] text-verdeSena text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#daeeda]">Hoy</span>
          </div>
          <div class="px-4 py-3 flex flex-col gap-3">
            <div v-for="item in actividad" :key="item.nombre" class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full flex-shrink-0"
                :class="item.tipo === 'entrada' ? 'bg-verdeSena' : 'bg-orange-400'"/>
              <div class="flex-1">
                <p class="text-xs font-semibold text-[#1a2e1a]">{{ item.nombre }}</p>
                <p class="text-[11px] text-[#6b8a6b]">{{ item.tiempo }}</p>
              </div>
              <span class="text-[10px] font-semibold px-2 py-1 rounded-full"
                :class="item.tipo === 'entrada'
                  ? 'bg-[#f0f7f1] text-[#27500a]'
                  : 'bg-orange-50 text-orange-700'">
                {{ item.tipo === 'entrada' ? 'Entrada' : 'Salida' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Acceso rápido -->
        <div class="bg-white rounded-2xl border border-[#daeeda] overflow-hidden">
          <div class="px-4 py-3 border-b border-[#f0f7f1]">
            <span class="text-sm font-bold text-[#1a2e1a] font-robotoSlab">Acceso rápido</span>
          </div>
          <div class="px-4 py-3 flex flex-col gap-3">
            <div v-for="tip in tips" :key="tip" class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-lg bg-[#f0f7f1] border border-[#daeeda] flex items-center justify-center flex-shrink-0 text-verdeSena text-xs font-bold mt-0.5">
                →
              </div>
              <p class="text-xs text-[#5a7a5a] leading-relaxed">{{ tip }}</p>
            </div>
          </div>
        </div>

      </div>

    </main>

    <footer class="bg-verdeSena text-white/70 text-[11px] text-center py-2 mt-auto">
      SENA · Centro de Tecnología y Automatización — Sistema CTA v2.0
    </footer>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderView from '@/layouts/HeaderView.vue'
import BaseCard from '@/components/Cards/BaseCard.vue'
import registerPerson from '@/assets/Icons/registerPersonGreen.png'
import ExitDoor from '@/assets/Icons/backOrange.png'
import RecordPaper from '@/assets/Icons/recordBlue.png'

const horaActual = ref('')
const fechaActual = ref('')
let intervalo: ReturnType<typeof setInterval>

const actualizarReloj = () => {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  horaActual.value = `${h}:${m}`
  const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  fechaActual.value = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`
}

onMounted(() => { actualizarReloj(); intervalo = setInterval(actualizarReloj, 1000) })
onUnmounted(() => clearInterval(intervalo))

const stats = [
  { label: 'Entradas hoy', value: 42,     icon: '↓', trend: '↑ 8% vs ayer',      trendColor: 'text-verdeSena' },
  { label: 'Salidas hoy',  value: 37,     icon: '↑', trend: '↓ 2% vs ayer',      trendColor: 'text-orange-500', valueColor: 'text-orange-700' },
  { label: 'Este Mes',    value: 5,      icon: '👤', trend: 'activos ahora' },
  { label: 'Este Trimestre',     value: '1.2k', icon: '📅', trend: 'registros totales' },
]

const actividad = [
  { nombre: 'Carlos Ramírez', tiempo: 'Hace 5 min',  tipo: 'entrada' },
  { nombre: 'María López',    tiempo: 'Hace 12 min', tipo: 'salida'  },
  { nombre: 'Juan Pérez',     tiempo: 'Hace 18 min', tipo: 'entrada' },
  { nombre: 'Ana Torres',     tiempo: 'Hace 31 min', tipo: 'entrada' },
]

const tips = [
  'Usa el escáner de código de barras para registros rápidos.',
  'El ingreso manual está disponible si el código no escanea.',
  'El historial guarda todos los registros del mes con filtros.',
]
</script>
