<script setup lang="ts">
// color palette
// none: FBF4C3 || outline
// low: FFD914
// medium: FBA409
// high: F8750E
// highest: F03F02

import { Badge } from '@/components/ui/badge'
import { computed } from 'vue'
import { Priorities } from '@/types/types.ts'

const props = defineProps<{
  priority: string
}>()

const checkVariant = computed(() => {
  return Priorities[props.priority] == 0 ? 'outline' : 'default'
})

const colors = computed(() => {
  switch (Priorities[props.priority]) {
    case 1:
      return 'bg-[#FFD914]'
    case 2:
      return 'bg-[#FBA409]'
    case 3:
      return 'bg-[#F8750E]'
    case 4:
      return 'bg-[#F03F02]'
    default:
      return ''
  }
})
</script>

<template>
  <Badge :class="colors" :variant="checkVariant">
    {{ props.priority }}
  </Badge>
</template>

<style scoped></style>
