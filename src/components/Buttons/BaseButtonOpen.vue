<template>
  <button
    @click="emit('click')"
    class="flex items-center gap-2 bg-verdeSena hover:bg-[#2d8800] text-white text-sm font-semibold font-quicksand px-4 py-2 rounded-xl transition-colors duration-150 flex-shrink-0"
  >
    <img v-if="image" :src="image" :alt="text" class="w-4 h-4 object-contain brightness-0 invert" />
    {{ text }}
  </button>
</template>

<script setup lang="ts">

// Evento de click para emitir la funcion
const emit = defineEmits<{
  (e: 'click'): void
}>()



// Props del componente
withDefaults(defineProps<{
  image? : string
  text : string,
  classButton? : string
}>(),{
  text : "texto"
})


</script>

<style>

</style>
