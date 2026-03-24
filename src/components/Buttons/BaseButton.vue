<template>
  <button
    :type="type"
    :class="[buttonClass, classButton]"
    class="w-full bg-verdeSena hover:bg-[#2d8800] text-white font-semibold font-quicksand text-sm py-2.5 rounded-xl transition-colors duration-150 mt-2 flex items-center justify-center gap-2"
  >
    <img v-if="buttonImg !== 'undefined'" :src="buttonImg" alt="" class="w-4 h-4 object-contain brightness-0 invert"/>
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  type?:        'button' | 'reset' | 'submit'
  buttonImg?:   string
  text:         string
  buttonClass?: string
  classButton?: string
}>(), {
  type:      'button',
  text:      'Mensaje...',
  buttonImg: 'undefined',
})
</script>
