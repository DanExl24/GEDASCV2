<!-- BaseCard.vue -->
<template>
  <router-link :to="viewLink" class="block h-full">
    <div
      class="group h-full flex flex-col items-center text-center px-5 pt-6 pb-5 rounded-2xl border bg-white transition-all duration-200 relative overflow-hidden cursor-pointer"
      :class="`border-${colors.border} hover:border-${colors.accent}`"
    >

      <!-- Franja izquierda al hover -->
      <div
        class="absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-r"
        :class="`bg-${colors.accent}`"
      />

      <!-- Ícono -->
      <div
        class="w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 flex-shrink-0"
        :class="`bg-${colors.iconBg} border-${colors.iconBorder}`"
      >
        <img v-if="cardImg" :src="cardImg" :alt="cardTitle" class="w-7 h-7 object-contain"/>
      </div>

      <!-- Label -->
      <p
        class="text-[10px] font-semibold uppercase tracking-widest font-quicksand mb-1"
        :class="`text-${colors.accent}`"
      >
        {{ cardLabel }}
      </p>

      <!-- Título -->
      <h2 class="text-sm font-bold text-gray-800 font-robotoSlab mb-2 leading-snug">
        {{ cardTitle }}
      </h2>

      <!-- Descripción -->
      <p class="text-xs text-gray-500 font-quicksand leading-relaxed flex-1">
        {{ cardText }}
      </p>

      <!-- Botón CTA — reemplaza solo este bloque -->
      <div
        class="mt-4 w-full py-2 rounded-xl border text-xs font-semibold font-quicksand transition-all duration-200 text-white"
        :class="`border-${colors.accent} bg-${colors.accent}`"
      >
        {{ ctaText }} →
      </div>

    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    cardText?:  string
    cardLabel?: string
    cardTitle?: string
    cardImg?:   string
    viewLink?:  string
    ctaText?:   string
    variant?:   'green' | 'orange' | 'blue'
  }>(),
  {
    cardText:  'Descripción del módulo.',
    cardLabel: 'Módulo',
    cardTitle: 'Tarjeta',
    viewLink:  '/',
    ctaText:   'Ver más',
    variant:   'green',
  }
)

const colorMap = {
  green:  {
    accent:      'verdeSena',
    border:      '[#daeeda]',
    iconBg:      '[#f0f7f1]',
    iconBorder:  '[#daeeda]',
  },
  orange: {
    accent:      'orange-500',
    border:      'orange-200',
    iconBg:      'orange-50',
    iconBorder:  'orange-200',
  },
  blue:   {
    accent:      'blue-500',
    border:      'blue-200',
    iconBg:      'blue-50',
    iconBorder:  'blue-200',
  },
}

const colors = computed(() => colorMap[props.variant])
</script>
