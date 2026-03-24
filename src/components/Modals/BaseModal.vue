<template>
  <Transition name="fade">
    <section
      v-if="active"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        <!-- Header del modal -->
        <div class="bg-verdeSena px-5 py-4 flex items-center justify-between">
          <h2 class="text-white font-bold font-robotoSlab text-base tracking-tight">
            {{ title }}
          </h2>
          <button
            @click="handleClose"
            class="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-150 flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <!-- Contenido del slot -->
        <div class="px-6 py-5">
          <slot/>
        </div>

      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const openModal  = () => active.value = true
const closeModal = () => active.value = false

const handleClose = () => {
  closeModal()
  emit('close')
}

withDefaults(defineProps<{
  title: string
}>(), {
  title: 'Título del Modal',
})

defineExpose({ openModal, closeModal })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>
