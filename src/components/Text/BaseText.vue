<template>
  <p v-if="text" :class="[ClaseDinamica,
    'text-xs font-quicksand font-medium px-3 py-2 rounded-lg border',
    type === 'success' ? 'bg-[#f0f7f1] text-verdeSena border-[#daeeda]' :
    type === 'error'   ? 'bg-red-50 text-red-600 border-red-200' :
                         'bg-yellow-50 text-yellow-700 border-yellow-200'
  ]">
    {{ text }}
  </p>
</template>
<script setup lang="ts">
import { computed,ref } from 'vue';
// props del componente
const props = withDefaults(defineProps<{
  text : string
  type : 'error' | 'success'
}>(),{

})

// ref para manejar la activacion
const active = ref(true)

// clases dinamicas segun props
const ClaseDinamica = computed(()=>{
  if(props.type == 'error') return 'text-red-700'
  else if (props.type == 'success') return 'text-senaColor'
  else return ''
})

// funcion para desaparecer el texto
const clear = () =>{
  active.value = false
}

defineExpose({
  clear
})

</script>
<style>

</style>
