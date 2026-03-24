<template>
  <select
    v-model="model"
    :class="[
      struct,
      'border rounded-xl px-3 py-2 text-sm font-quicksand font-medium focus:outline-none focus:ring-2 focus:ring-verdeSena/30 focus:border-verdeSena disabled:bg-gray-200 transition-colors duration-150 cursor-pointer'
    ]"
  >
    <option disabled value="" class="bg-white text-gray-400">
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="bg-white text-[#1a2e1a] font-medium"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed } from 'vue'

interface Option<T> {
  label: string
  value: T
}

const model = defineModel<T | ''>()

const props = defineProps<{
  options: Option<T>[]
  placeholder: string
  struct?: string
}>()

const struct = computed(() => {
  if (props.struct === 'white')  return 'bg-white text-[#1a2e1a] border-[#daeeda]'
  if (props.struct === 'green')  return 'bg-verdeSena text-white border-[#2d8800]'
  return 'bg-white text-[#1a2e1a] border-[#daeeda]'
})
</script>
