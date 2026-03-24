<template>
  <div class="relative w-full">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b8a6b] text-sm pointer-events-none">
      🔍
    </span>
    <input
      :value="modelValue"
      @input="handleInput"
      type="text"
      placeholder="Buscar aprendiz por nombre, DNI o formación..."
      class="w-full pl-9 pr-4 py-2.5 text-sm font-quicksand bg-white border border-[#daeeda] rounded-xl text-[#1a2e1a] placeholder:text-[#9ab89a] focus:outline-none focus:border-verdeSena focus:ring-2 focus:ring-verdeSena/20 transition-all duration-150"
    />
  </div>
</template>

<script setup lang="ts">

// props del componente
const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  type?: string
  readonly?: boolean
  inputEvent?: (value:string) => void
}>(), {
  modelValue: '',
  placeholder: 'Digite cualquier dato del aprendiz...',
  type: 'text',
  readonly: false
})

// emitir evento
const emit = defineEmits(['update:modelValue'])

// funcion para input automatico
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)

  if(props.inputEvent) {
    props.inputEvent(value)
  }
}
</script>
