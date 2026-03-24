<template>
  <div class="min-h-screen bg-[#f0f7f1] flex flex-col">

    <HeaderView header-title="Ingreso de Aprendices al Centro de Formación"/>

    <!-- Barra de navegación secundaria -->
    <div class="w-full bg-white border-b border-[#daeeda] px-6 py-2.5 flex items-center justify-between">
      <ExitButton to="/"/>
      <BaseButtonOpen @click="open" :image="codebar" text="Escanear Aprendiz"/>
    </div>

    <BarcodeScanner ref="scannerModal" @aprendiz-detectado="detectAprendiz"/>

    <main class="flex-1 max-w-5xl w-full mx-auto px-6 py-6 flex flex-col gap-5">

      <!-- Barra de búsqueda + botón manual -->
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <SearchBar v-model="queryAprendices"/>
        </div>
        <BaseButtonOpen @click="openManual" :image="add" text="Ingreso Manual"/>
        <BaseModal ref="modalManual" title="Registro Manual">
          <BaseForm method="POST" :submit="submit">
            <BaseField :input-event="EventoManual" v-model="formManual.documento"
              label="Documento de Identidad" place-holder="Ingresa el documento" type="text"/>
            <BaseField v-model="formManual.nombre"
              label="Nombre" place-holder="Esperando documento..." type="text" readonly/>
            <BaseField v-model="formManual.apellido"
              label="Apellido" place-holder="Esperando documento..." type="text" readonly/>
            <BaseField v-model="formManual.formacion"
              label="Formación" place-holder="Esperando documento..." type="text" readonly/>
            <BaseText :text="alerta.message" :type="alerta.type"/>
            <BaseButton text="Registrar Ingreso" type="submit"/>
          </BaseForm>
        </BaseModal>
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-2xl border border-[#daeeda] overflow-hidden">
        <!-- Encabezado de la tabla -->
        <div class="px-5 py-4 border-b border-[#daeeda] flex items-center justify-between">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-widest text-verdeSena mb-0.5">
              Registro del día
            </p>
            <h2 class="text-sm font-bold text-[#1a2e1a] font-robotoSlab">
              Aprendices ingresados
            </h2>
          </div>
          <span class="bg-[#f0f7f1] text-verdeSena text-xs font-semibold px-3 py-1 rounded-full border border-[#daeeda]">
            {{ aprendizData.length }} registros
          </span>
        </div>

        <BaseTable>
          <BaseColumn>
            <BaseTableHead name="Nombre"/>
            <BaseTableHead name="Apellido"/>
            <BaseTableHead name="DNI"/>
            <BaseTableHead name="Formación"/>
            <BaseTableHead name="Hora de Ingreso"/>
          </BaseColumn>
          <BaseColumn v-for="aprendiz in aprendizData" :key="aprendiz.id_aprendiz">
            <td>{{ aprendiz.nombre }}</td>
            <td>{{ aprendiz.apellido }}</td>
            <td>{{ aprendiz.documento }}</td>
            <td>{{ aprendiz.formacion }}</td>
            <td>{{ aprendiz.hora_ingreso }}</td>
          </BaseColumn>
        </BaseTable>
      </div>

    </main>
  </div>
</template>
<script setup lang="ts">

// ====================================================================
// DEPENDENCIAS
// ===================================================================

import { ref,onMounted,reactive,watch } from 'vue';
import HeaderView from '@/layouts/HeaderView.vue';
import ExitButton from '@/components/UI/ExitButton.vue';
import SearchBar from '@/components/UI/SearchBar.vue';
import BaseTable from '@/components/Tables/BaseTable.vue';
import BaseColumn from '@/components/Tables/BaseColumn.vue';
import BaseTableHead from '@/components/Tables/BaseTableHead.vue';
import BaseButtonOpen from '@/components/Buttons/BaseButtonOpen.vue';
import codebar from '@/assets/Icons/barcodeScanner.png'
import BarcodeScanner from '@/components/Library/BarcodeScanner.vue';
import { DetectEntry } from '@/Services/DetectEntrys';
import BaseModal from '@/components/Modals/BaseModal.vue';
import add from '@/assets/Icons/add.png'
import BaseForm from '@/components/Forms/BaseForm.vue';
import BaseField from '@/components/Forms/BaseField.vue';
import BaseButton from '@/components/Buttons/BaseButton.vue';
import BaseText from '@/components/Text/BaseText.vue';
import { SearchAprendiz } from '@/Services/SearchAprendiz';
// ==========================================================================
// ENTORNO
// ==========================================================================

const API = import.meta.env.VITE_API_URL




// -------------------------------------- LOGICA DEL COMPONENTE --------------------------- //



// ======================================================
// REFERENCIA A VARIABLES
//  =====================================================

const scannerModal = ref<InstanceType<typeof BarcodeScanner> | null>(null)
const modalManual = ref()
const aprendizData = ref<Aprendiz[]>([])
const queryAprendices = ref('')

// -- Alerta de formulario manual -- //
const alerta = ref({message: '', type: 'error' as 'error' | 'success'})



// ======================================================
// VARIABLES REACTIVAS
//  =====================================================

// Campos del formulario manual
const formManual = reactive({documento: '', nombre: '', apellido: '', formacion: ''})
// Campos del formulario de maquia




// ==========================================================
// INTERFACES
// ==========================================================


// -- Interfaz para aprendices
export interface Aprendiz {
  id_aprendiz: number
  nombre: string
  apellido: string
  documento: string
  formacion: string

  hora_ingreso?: string
  hora_salida?: string

  id_detallemaquina?: number
}







// ===================================================
// FUNCIONES AUXILIARES
// ===================================================


// -- Detectar aprendices registrados a el registro de ingreso
const detectAprendiz = async (code: string): Promise<boolean> => {
  // si llega codigo incorrecto
  if(!code) {
    console.error("Código vacío recibido");
    return false;
  }

  // esperar respuesta de registro
  const NoIngresado = await DetectEntry(code)

  // si esta registrado, no deja avanzar
  if(!NoIngresado){
  console.log("El aprendiz ya tiene un ingreso")
    return false
  }

  // esperar respuesta del ingreso de entrada
  const registrado = await addEntry(code)

  // si hay un inconveniente, retornar falso
  if (!registrado) {
    return false
  }

  // cerrar modal
  scannerModal.value?.closeScanner()

  // retornar verdadero
  return true
}



// -- Ingresar Aprendices
const addEntry = async (code : string) => {
  if(!code) return //si el codigo llega vacio

  try{
    const response = await fetch(`${API}/api/registroIngresos/addEntry/${code}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json()

    if(!response.ok){
      if (response.status === 409) {
          // Mostrar mensaje del backend
          console.log("Info:", data.message)
          return
      }
    }

    console.log("Ingreso registrado:", data);
    HistorialIngresos();  // refrescar tabla
    return true
  } catch (error) {
    console.error(error);
  }
}



// -- Historial de registro de ingreso de los aprendices
const HistorialIngresos = async () => {
  try{
    // historial de ingresos
    const response = await fetch(`${API}/api/registroIngresos/historial`)
    const data = await response.json()
    console.log(data)

    aprendizData.value = data as  Aprendiz[] //Traer los aprendices

  } catch (error) {
    console.error(error)
  }
}







// =======================================================
// ON MOUNTED (Se ejecuta al montar el DOM)
// =======================================================

onMounted(() => {
  HistorialIngresos(); // esto trae el historial apenas se abre la vista
})




// =======================================================
// FUNCIONES OPEN Y SUS MODALES
// ========================================================

// -- Abrir Scanner
const open = () => {
  scannerModal.value?.openScanner()
}

// -- Abrir modal de registro Manual
const openManual = ()=>{
  modalManual.value.openModal()
  // vaciar todos los campos
    alerta.value.message = ''
    formManual.documento = ''
    formManual.nombre = ''
    formManual.apellido = ''
    formManual.formacion = ''
}





// =======================================================
// FUNCIONES CLOSE Y SUS MODALES
// ========================================================




// ========================================================
// EVENTOS SUBMITS
// =========================================================

// -- Ingresar aprendiz a registro de ingreso
const submit = async () => {
  // validar campo vacío
  if (!formManual.documento) {
    alerta.value.message = 'Ingrese un documento de identidad';
    alerta.value.type = 'error';
    return; // detener ejecución
  }

  // validar longitud
  if (formManual.documento.length !== 10) {
    alerta.value.message = 'El DNI debe tener 10 dígitos';
    alerta.value.type = 'error';
    return; // detener ejecución
  }

  // Opcional: validar que solo sean números
  if (!/^\d{10}$/.test(formManual.documento)) {
    alerta.value.message = 'El DNI debe contener solo números';
    alerta.value.type = 'error';
    return;
  }

  // llamar a la función de registro
  const registrado = await detectAprendiz(formManual.documento);

  if (registrado) {
    alerta.value.message = 'Registro aceptado';
    alerta.value.type = 'success';
    setTimeout(() => {
      modalManual.value.closeModal();
    }, 1000);
  } else {
    alerta.value.message = 'El aprendiz ya tiene un registro';
    alerta.value.type = 'error';
  }
};

// -- CONSULTAR DATOS DEL APRENDIZ PARA EL REGISTRO MANUAL -- //
const EventoManual = async (DocumentoManual : string) =>{
  if(!DocumentoManual) return // si el documento esta mal
  if(DocumentoManual.length!=10){
    console.log("el dni debe tener 10 digitos")
    alerta.value.message = ''
    formManual.nombre = ''
    formManual.apellido = ''
    formManual.formacion = ''
    return // si el documento no tiene 10 digitos
  }
  console.log("documento recibido",DocumentoManual)
  try{
    const response = await fetch(`${API}/api/registroIngresos/ingresoManual/${DocumentoManual}`)
    const data = await response.json()

    if(!response.ok){console.log(data.message); return}

    console.log(data)
    // Obtener datos del aprendiz
    formManual.nombre = data.result.nombre
    console.log(data.result.nombre)
    formManual.apellido = data.result.apellido
    formManual.formacion = data.result.formacion

    console.log(formManual)
    // Rellenar campos
  } catch(error) {console.error(error)}
}





// ================================== WATCHS =========================== //



// -- VERIFICAR SI HAY BUSQUEDA DE APRENDICES -- //
watch(queryAprendices, async (nuevoTexto) => {

  if (!nuevoTexto.trim()) {await HistorialIngresos(); return} //si no hay texto

  const data = await SearchAprendiz(nuevoTexto,'ingreso') // si hay texto

  aprendizData.value = data // Pasar el aprendiz encontrado en busqueda

})









</script>
<style>

</style>
