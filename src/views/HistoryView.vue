<template>
  <div class="min-h-screen bg-[#f4f9f4] flex flex-col">

    <HeaderView header-title="Registro Histórico de Ingreso y Salida de Aprendices"/>

    <div class="w-full bg-white border-b border-[#daeeda] px-6 py-2.5 flex items-center justify-between">
      <ExitButton to="/"/>
    </div>

    <main class="flex-1 w-full px-8 py-6 flex flex-col gap-5">

      <!-- Filtros -->
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <SearchBar v-model="queryAprendices"/>
        </div>
        <BaseSelect
          struct="green"
          placeholder="Programa de Formación"
          v-model:model-value="filters.Program"
          :options="optionsProgram"
        />
        <BaseSelect
          struct="green"
          placeholder="Fecha"
          v-model:model-value="filters.Date"
          :options="optionsDates"
        />
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-2xl border border-[#daeeda] overflow-hidden w-full">

        <div class="px-5 py-4 border-b border-[#daeeda] flex items-center justify-between">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-widest text-blue-500 mb-0.5">
              Historial completo
            </p>
            <h2 class="text-sm font-bold text-[#1a2e1a] font-robotoSlab">
              Registro de ingresos y salidas
            </h2>
          </div>
          <span class="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
            {{ historial.length }} registros
          </span>
        </div>

        <div class="overflow-x-auto">
          <BaseTable>
            <BaseColumn>
              <BaseTableHead name="Nombre"/>
              <BaseTableHead name="Apellido"/>
              <BaseTableHead name="DNI"/>
              <BaseTableHead name="Formación"/>
              <BaseTableHead name="Ingreso"/>
              <BaseTableHead name="Salida"/>
            </BaseColumn>
            <BaseColumn v-for="aprendiz in historial" :key="aprendiz.id_ingreso">
              <td>{{ aprendiz.nombre }}</td>
              <td>{{ aprendiz.apellido }}</td>
              <td>{{ aprendiz.documento }}</td>
              <td>{{ aprendiz.formacion }}</td>
              <td>{{ aprendiz.hora_ingreso || '—' }}</td>
              <td>
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-full"
                  :class="aprendiz.hora_salida
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'bg-[#f0f7f1] text-verdeSena border border-[#daeeda]'"
                >
                  {{ aprendiz.hora_salida || 'No salio' }}
                </span>
              </td>
            </BaseColumn>
          </BaseTable>
        </div>

      </div>
    </main>
  </div>
</template>
<script setup lang="ts">

// ================= IMPORTS =================
import { ref, onMounted, watch, reactive } from 'vue'

// Componentes UI
import HeaderView from '@/layouts/HeaderView.vue'
import BaseTable from '@/components/Tables/BaseTable.vue'
import BaseColumn from '@/components/Tables/BaseColumn.vue'
import BaseTableHead from '@/components/Tables/BaseTableHead.vue'
import ExitButton from '@/components/UI/ExitButton.vue'
import SearchBar from '@/components/UI/SearchBar.vue'
import BaseSelect from '@/components/Forms/BaseSelect.vue'

// Constantes
import { optionsDates } from '@/constants/optionsDates'
import { optionsProgram } from '@/constants/optionsProgram'

// ================= CONFIG =================
const API = import.meta.env.VITE_API_URL



// ================= ESTADOS =================

// Lista principal del historial
const historial = ref<HistorialAprendiz[]>([])


// Buscador
const queryAprendices = ref()


// Filtros activos
const filters = reactive({
  Date: 'TODAY',
  Program: 'ADSO'
})



// ================= INTERFACES =================

interface HistorialAprendiz {
  id_ingreso: number
  id_aprendiz: number
  nombre: string
  apellido: string
  documento: string
  formacion: string
  hora_ingreso: string | null
  hora_salida: string | null
  id_detallemaquina: number | null
}





// ================= FUNCIONES API =================

// 🔥 Obtener historial completo (sin filtros)
const getHistorial = async () => {
  const res = await fetch(`${API}/api/historico/historial`)
  const data: HistorialAprendiz[] = await res.json()

  historial.value = data
}


// 🔥 Obtener historial con filtros dinámicos
const getHistorialByFilters = async () => {
  try {
    const params = new URLSearchParams()

    // Agregar filtros si existen
    if (filters.Date) {
      params.append('date', filters.Date)
    }

    if (filters.Program) {
      params.append('program', filters.Program)
    }

    if (queryAprendices.value) {
      params.append('search', queryAprendices.value)
    }

    // Construcción de query string
    const query = params.toString() ? `?${params.toString()}` : ''

    const res = await fetch(`${API}/api/historico/historialFechas${query}`)
    const data: HistorialAprendiz[] = await res.json()

    historial.value = data

  } catch (error) {
    console.error(error)
  }
}




// ================= CICLO DE VIDA =================

// 🚀 Al montar el componente, cargar datos con filtros por defecto
onMounted(() => {
  getHistorialByFilters()
})



// ================= WATCHERS =================

// 👀 Observa cambios en filtros y búsqueda
watch(
  () => [filters.Date, filters.Program, queryAprendices.value],
  () => {
    if (filters.Date || filters.Program || queryAprendices.value) {
      getHistorialByFilters()
    } else {
      getHistorial()
    }
  }
)

</script>
