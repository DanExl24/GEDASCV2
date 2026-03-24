<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-[11px] font-semibold uppercase tracking-wider text-[#5a7a5a] font-quicksand">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeHolder"
      :readonly="readonly"
      @input="handleInput"
      :class="[
        'w-full px-3 py-2.5 text-sm font-quicksand rounded-xl border transition-all duration-150 focus:outline-none',
        readonly
          ? 'bg-[#f8fbf8] border-[#daeeda] text-[#6b8a6b] cursor-not-allowed'
          : 'bg-white border-[#daeeda] text-[#1a2e1a] focus:border-verdeSena focus:ring-2 focus:ring-verdeSena/20'
      ]"
    />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: string
  placeHolder?: string
  label: string
  readonly?: boolean
  inputEvent?: (value:string)=>void,
  maxLength? : number
}>(),{
  type:'text',
  placeHolder:'Write something...',
  readonly:false,
  modelValue : ''
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  emit('update:modelValue', value)

  if(props.inputEvent){
    props.inputEvent(value)
  }
}

</script>
