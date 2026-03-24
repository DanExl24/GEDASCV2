<template>
  <header class="w-full bg-[#39a900] border-b-[3px] border-[#2d8800] h-16 px-5 flex items-center justify-between gap-4 relative">

    <!-- Logo + Marca -->
    <div class="flex items-center gap-2.5 flex-shrink-0">
      <div class="w-9 h-9 bg-white rounded-full overflow-hidden flex-shrink-0">
        <img :src="senaLogo" alt="SENA" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col leading-none gap-0.5">
        <span class="text-white font-bold text-base font-robotoSlab">SENA</span>
        <span class="text-white/80 text-[11px] font-quicksand hidden sm:block">
          Centro de Tecnología y Automatización · CTA
        </span>
      </div>
    </div>

    <!-- Título central (absolutamente centrado) -->
    <h1 class="absolute left-1/2 -translate-x-1/2 text-white text-sm font-semibold font-quicksand text-center truncate max-w-xs lg:max-w-md hidden md:block pointer-events-none">
      {{ HeaderTitle }}
    </h1>

    <!-- Badge derecho -->
    <div class="flex-shrink-0 bg-white/20 text-white text-[11px] font-semibold font-quicksand px-3 py-1.5 rounded-full border border-white/30">
      Control de Acceso
    </div>

  </header>
</template>

<script setup lang="ts">
import senaLogo from '@/assets/Logos/logo-del-sena-verde.jpg'

withDefaults(
  defineProps<{
    HeaderTitle?: string
  }>(),
  {
    HeaderTitle: 'Gestor de Entrada y Salida — Centro de Formación',
  }
)
</script>
