<template>
  <router-link :to="to">
    <button class="flex items-center gap-2 text-[#5a7a5a] hover:text-verdeSena text-sm font-semibold font-quicksand transition-colors duration-150 group">
      <span class="w-7 h-7 rounded-lg bg-[#f0f7f1] border border-[#daeeda] flex items-center justify-center group-hover:border-verdeSena transition-colors duration-150">
        ←
      </span>
      Volver
    </button>
  </router-link>
</template>

<script setup lang="ts">
// Dependencias
import back from '@/assets/Icons/Back.png'

// Props del componente
withDefaults(defineProps<{
  to : string,
  ButtonImg? : string
}>(),{
  ButtonImg : back
})

</script>
<style>

</style>
