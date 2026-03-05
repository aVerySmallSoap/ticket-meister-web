<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { type MappedStatus } from '@/types/types.ts'
import { computed } from 'vue'

const props = defineProps<{
  status: MappedStatus
}>()

const checkVariant = computed(() => {
  return props.status.code == 0 ? 'outline' : 'default'
})

const colors = computed(() => {
  switch (props.status.code) {
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
  <div class="flex flex-wrap justify-center gap-1">
    <Badge :class="colors" :variant="checkVariant">
      {{ props.status.name }}
    </Badge>
  </div>
</template>
